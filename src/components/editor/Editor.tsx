import React, { useCallback, useRef, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { analyzeText } from '../../services/textAnalyze';
import { EditorToolbar } from './toolbar/EditorToolbar';
import { EditorContent } from './content/EditorContent';
import { StatsPanel } from './stats/StatsPanel';
import { calculateBasicStats } from '../../utils/editor/statsCalculator';
import { HeadingType } from './type';
import { DocumentStats, ReadabilityLevel } from '../../types/editor';

const initialStats: DocumentStats = {
  words: 0,
  characters: 0,
  sentences: 0,
  paragraphs: 0,
  readingTime: '0s',
  readability: {
    score: 0,
    level: 'Very Easy',
    fleschKincaid: 0,
    gunningFog: 0,
    colemanLiau: 0,
    smog: 0,
    automatedReadability: 0
  },
  complexity: {
    hardToRead: 0,
    veryHardToRead: 0,
    complexWords: 0,
    longSentences: 0
  }
};

export const Editor: React.FC = () => {
  const [content, setContent] = React.useState('');
  const [stats, setStats] = React.useState<DocumentStats>(initialStats);
  const editorRef = useRef<HTMLDivElement>(null);

  const debouncedContent = useDebounce(content, 1000);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!debouncedContent) {
        setStats(initialStats);
        return;
      }

      try {
        const analysis = await analyzeText(debouncedContent);
        setStats(analysis);
      } catch (error) {
        console.error('Failed to analyze text:', error);
        setStats(initialStats);
      }
    };

    fetchAnalysis();
  }, [debouncedContent]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    const newStats = calculateBasicStats(newContent);
    setStats(newStats);
  };

  const handleFormat = useCallback((command: string) => {
    document.execCommand(command, false);
  }, []);

  const handleHeading = useCallback((type: HeadingType) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    
    // Get the current block element
    let currentBlock = container.nodeType === 3 ? container.parentElement : container as Element;
    while (currentBlock && !['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'DIV'].includes(currentBlock.nodeName)) {
      currentBlock = currentBlock.parentElement;
    }

    // Get the appropriate Tailwind classes for this heading type
    const headingClasses = getHeadingClasses(type);

    // If we're in the editor root, wrap the selection in a new block
    if (currentBlock === editorRef.current) {
      const newBlock = document.createElement(type);
      const text = selection.toString() || '<br>';
      
      // Add Tailwind classes
      newBlock.className = headingClasses;
      
      // Insert the new block
      newBlock.innerHTML = text;
      range.deleteContents();
      range.insertNode(newBlock);
      
      // Place cursor at the end
      const newRange = document.createRange();
      newRange.selectNodeContents(newBlock);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else if (currentBlock) {
      // We found a block element, convert it
      const newBlock = document.createElement(type);
      newBlock.className = headingClasses;
      newBlock.innerHTML = currentBlock.innerHTML || '<br>';
      currentBlock.parentNode?.replaceChild(newBlock, currentBlock);
      
      // Place cursor at the end
      const newRange = document.createRange();
      newRange.selectNodeContents(newBlock);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }

    // Ensure focus is maintained
    editorRef.current?.focus();

    // Update content
    if (editorRef.current) {
      handleContentChange(editorRef.current.innerHTML);
    }
  }, []);

  const getHeadingClasses = (type: HeadingType): string => {
    switch (type) {
      case 'h1':
        return 'text-4xl font-bold text-white mb-4';
      case 'h2':
        return 'text-3xl font-bold text-white mb-3';
      case 'h3':
        return 'text-2xl font-bold text-white mb-3';
      case 'h4':
        return 'text-xl font-semibold text-white mb-2';
      case 'h5':
        return 'text-lg font-semibold text-white mb-2';
      case 'h6':
        return 'text-base font-semibold text-white mb-2';
      default:
        return 'text-base text-white mb-2';
    }
  };

  const handleLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      // Clean and validate URL
      let cleanUrl = url.trim();
      
      // Remove the current window location if it's at the start of the URL
      const currentHost = window.location.origin;
      if (cleanUrl.startsWith(currentHost)) {
        cleanUrl = cleanUrl.substring(currentHost.length);
      }

      // Add https:// if no protocol is specified
      if (!/^https?:\/\//i.test(cleanUrl) && !cleanUrl.startsWith('/')) {
        cleanUrl = 'https://' + cleanUrl;
      }

      const range = selection.getRangeAt(0);
      const link = document.createElement('a');
      link.href = cleanUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'text-blue-500 underline cursor-pointer hover:text-blue-600';
      link.textContent = selection.toString();

      // Add click handler to open in new tab
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(cleanUrl, '_blank', 'noopener,noreferrer');
      });

      range.deleteContents();
      range.insertNode(link);

      // Move cursor after the link
      const newRange = document.createRange();
      newRange.setStartAfter(link);
      newRange.setEndAfter(link);
      selection.removeAllRanges();
      selection.addRange(newRange);

      // Update content
      if (editorRef.current) {
        handleContentChange(editorRef.current.innerHTML);
      }
    }
  }, []);

  return (
    <div className="flex gap-6 h-[700px]"> {/* Fixed height container */}
      <div className="flex-1 flex flex-col overflow-hidden"> {/* Flex column for toolbar and editor */}
        <EditorToolbar 
          onFormat={handleFormat}
          onHeadingSelect={handleHeading}
          onAddLink={handleLink}
        />
        <div className="flex-1 min-h-0"> {/* min-h-0 is important for flex child */}
          <EditorContent
            ref={editorRef}
            content={content}
            onChange={handleContentChange}
            onSelectionChange={() => {}}
          />
        </div>
      </div>

      <div className="w-80 shrink-0 overflow-y-auto"> {/* Make stats panel scrollable */}
        <StatsPanel stats={stats} />
      </div>
    </div>
  );
};
