import React from 'react';
import { Bold, Italic, Underline, Link, Type } from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarDivider } from './ToolbarDivider';
import { HeadingSelect } from './HeadingSelect';
import { HeadingType } from '../type';

interface EditorToolbarProps {
  onFormat: (format: string) => void;
  onHeadingSelect: (type: HeadingType) => void;
  onAddLink: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onFormat,
  onHeadingSelect,
  onAddLink
}) => {
  return (
    <div className="flex items-center gap-1 border-b border-white/10 pb-3">
      <HeadingSelect onChange={onHeadingSelect} />
      <ToolbarDivider />
      <ToolbarButton
        icon={Bold}
        tooltip="Bold (Ctrl+B)"
        onClick={() => onFormat('bold')}
      />
      <ToolbarButton
        icon={Italic}
        tooltip="Italic (Ctrl+I)"
        onClick={() => onFormat('italic')}
      />
      <ToolbarButton
        icon={Underline}
        tooltip="Underline (Ctrl+U)"
        onClick={() => onFormat('underline')}
      />
      <ToolbarDivider />
      <ToolbarButton
        icon={Link}
        tooltip="Add Link (Ctrl+K)"
        onClick={onAddLink}
      />
    </div>
  );
};
