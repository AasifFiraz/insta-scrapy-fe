import { useState, useCallback } from 'react';

interface TextSelection {
  start: number;
  end: number;
  text: string;
}

export const useTextFormatting = (initialContent: string = '') => {
  const [content, setContent] = useState(initialContent);
  const [selection, setSelection] = useState<TextSelection | null>(null);

  const updateSelection = useCallback((element: HTMLTextAreaElement | HTMLDivElement) => {
    if (element instanceof HTMLTextAreaElement) {
      setSelection({
        start: element.selectionStart,
        end: element.selectionEnd,
        text: element.value.substring(element.selectionStart, element.selectionEnd)
      });
    } else {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        setSelection({
          start: getTextOffset(element, range.startContainer, range.startOffset),
          end: getTextOffset(element, range.endContainer, range.endOffset),
          text: selection.toString()
        });
      }
    }
  }, []);

  const formatText = useCallback((format: string) => {
    if (!selection) return;

    let newContent = content;
    const prefix = getFormatPrefix(format);
    const suffix = getFormatSuffix(format);

    // Insert formatting tags around selected text
    newContent = 
      newContent.substring(0, selection.start) +
      prefix +
      selection.text +
      suffix +
      newContent.substring(selection.end);

    setContent(newContent);
  }, [content, selection]);

  return {
    content,
    setContent,
    selection,
    updateSelection,
    formatText
  };
};

// Helper function to get text offset in contentEditable div
const getTextOffset = (
  root: Node,
  node: Node,
  offset: number
): number => {
  let totalOffset = 0;

  const walk = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null
  );

  let currentNode = walk.nextNode();
  while (currentNode && currentNode !== node) {
    totalOffset += currentNode.textContent?.length || 0;
    currentNode = walk.nextNode();
  }

  return totalOffset + offset;
};

// Get opening tag for format
const getFormatPrefix = (format: string): string => {
  switch (format) {
    case 'bold':
      return '**';
    case 'italic':
      return '_';
    case 'underline':
      return '__';
    case 'link':
      return '[';
    case 'bulletList':
      return '\n- ';
    case 'numberedList':
      return '\n1. ';
    case 'alignLeft':
      return ':left:';
    case 'alignCenter':
      return ':center:';
    case 'alignRight':
      return ':right:';
    default:
      return '';
  }
};

// Get closing tag for format
const getFormatSuffix = (format: string): string => {
  switch (format) {
    case 'bold':
      return '**';
    case 'italic':
      return '_';
    case 'underline':
      return '__';
    case 'link':
      return '](url)';
    default:
      return '';
  }
};