import React, { forwardRef } from 'react';

interface EditorContentProps {
  content: string;
  onChange: (content: string) => void;
  onSelectionChange: (element: HTMLDivElement) => void;
}

export const EditorContent = forwardRef<HTMLDivElement, EditorContentProps>(({
  content,
  onChange,
  onSelectionChange
}, ref) => {
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.innerHTML);
    onSelectionChange(e.currentTarget);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertParagraph', false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="relative h-[600px] mt-4"> {/* Fixed height container */}
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onSelect={(e) => onSelectionChange(e.currentTarget)}
        className="absolute inset-0 p-4 bg-black text-white focus:outline-none rounded-lg border border-white/10 overflow-y-auto"
        suppressContentEditableWarning
      />
    </div>
  );
});

EditorContent.displayName = 'EditorContent';
