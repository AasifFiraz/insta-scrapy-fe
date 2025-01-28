import { useState, useCallback } from 'react';
import { parseMarkdown } from '../utils/editor/rendering/markdownParser';
import { analyzeText } from '../utils/editor/analysis/analyzer';
import { HeadingType } from '../components/editor/type';

interface EditorState {
  content: string;
  selection: {
    start: number;
    end: number;
    text: string;
  } | null;
}

export const useMarkdownEditor = (initialContent: string = '') => {
  const [state, setState] = useState<EditorState>({
    content: initialContent,
    selection: null
  });

  const updateContent = useCallback((newContent: string) => {
    setState(prev => ({
      ...prev,
      content: newContent
    }));
  }, []);

  const updateSelection = useCallback((element: HTMLTextAreaElement) => {
    setState(prev => ({
      ...prev,
      selection: {
        start: element.selectionStart,
        end: element.selectionEnd,
        text: element.value.substring(element.selectionStart, element.selectionEnd)
      }
    }));
  }, []);

  const formatSelection = useCallback((format: string) => {
    if (!state.selection) return;

    const prefix = getFormatPrefix(format);
    const suffix = getFormatSuffix(format);
    
    const newContent = 
      state.content.substring(0, state.selection.start) +
      prefix +
      state.selection.text +
      suffix +
      state.content.substring(state.selection.end);

    updateContent(newContent);
  }, [state.content, state.selection, updateContent]);

  const addLink = useCallback((url: string) => {
    if (!state.selection) return;

    const newContent = 
      state.content.substring(0, state.selection.start) +
      `[${state.selection.text}](${url})` +
      state.content.substring(state.selection.end);

    updateContent(newContent);
  }, [state.content, state.selection, updateContent]);

  const setHeading = useCallback((type: HeadingType) => {
    if (!state.selection) return;

    const lines = state.content.split('\n');
    let currentPos = 0;
    let newContent = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineStart = currentPos;
      const lineEnd = lineStart + line.length;

      if (state.selection.start <= lineEnd && state.selection.end >= lineStart) {
        // This line is part of the selection
        const prefix = type === 'p' ? '' : '#'.repeat(parseInt(type.slice(1)));
        const cleanLine = line.replace(/^#{1,6}\s*/, '');
        newContent += prefix ? `${prefix} ${cleanLine}\n` : `${cleanLine}\n`;
      } else {
        newContent += line + '\n';
      }

      currentPos = lineEnd + 1; // +1 for the newline
    }

    updateContent(newContent.trimEnd());
  }, [state.content, state.selection, updateContent]);

  return {
    content: state.content,
    parsedContent: parseMarkdown(state.content),
    selection: state.selection,
    updateContent,
    updateSelection,
    formatSelection,
    addLink,
    setHeading
  };
};

// Helper functions for formatting
const getFormatPrefix = (format: string): string => {
  switch (format) {
    case 'bold': return '**';
    case 'italic': return '_';
    case 'underline': return '__';
    default: return '';
  }
};

const getFormatSuffix = (format: string): string => {
  switch (format) {
    case 'bold': return '**';
    case 'italic': return '_';
    case 'underline': return '__';
    default: return '';
  }
};
