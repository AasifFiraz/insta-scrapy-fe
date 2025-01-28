export type HeadingType = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface Token {
  type: 'text' | 'bold' | 'italic' | 'underline' | 'link' | 'heading';
  content: string;
  level?: number; // For headings
  url?: string;   // For links
  start: number;
  end: number;
}
