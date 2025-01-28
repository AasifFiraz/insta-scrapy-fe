import { Token } from '../../../components/editor/type';

export const parseMarkdown = (text: string): Token[] => {
  if (!text) return [];

  const tokens: Token[] = [];
  let currentPosition = 0;

  while (currentPosition < text.length) {
    const remainingText = text.slice(currentPosition);
    let match = false;

    // Headings
    const headingMatch = remainingText.match(/^(#{1,6})\s+([^\n]+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      tokens.push({
        type: 'heading',
        content: headingMatch[2],
        level,
        start: currentPosition,
        end: currentPosition + headingMatch[0].length
      });
      currentPosition += headingMatch[0].length;
      match = true;
      continue;
    }

    // Links
    const linkMatch = remainingText.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      tokens.push({
        type: 'link',
        content: linkMatch[1],
        url: linkMatch[2],
        start: currentPosition,
        end: currentPosition + linkMatch[0].length
      });
      currentPosition += linkMatch[0].length;
      match = true;
      continue;
    }

    // Bold
    if (remainingText.startsWith('**')) {
      const endPos = remainingText.indexOf('**', 2);
      if (endPos !== -1) {
        tokens.push({
          type: 'bold',
          content: remainingText.slice(2, endPos),
          start: currentPosition,
          end: currentPosition + endPos + 2
        });
        currentPosition += endPos + 4;
        match = true;
        continue;
      }
    }

    // Italic
    if (remainingText.startsWith('_') && !remainingText.startsWith('__')) {
      const endPos = remainingText.indexOf('_', 1);
      if (endPos !== -1) {
        tokens.push({
          type: 'italic',
          content: remainingText.slice(1, endPos),
          start: currentPosition,
          end: currentPosition + endPos + 1
        });
        currentPosition += endPos + 2;
        match = true;
        continue;
      }
    }

    // Underline
    if (remainingText.startsWith('__')) {
      const endPos = remainingText.indexOf('__', 2);
      if (endPos !== -1) {
        tokens.push({
          type: 'underline',
          content: remainingText.slice(2, endPos),
          start: currentPosition,
          end: currentPosition + endPos + 2
        });
        currentPosition += endPos + 4;
        match = true;
        continue;
      }
    }

    // Plain text
    if (!match) {
      const nextMarker = remainingText.search(/[\*_\[\n#]/);
      const textEnd = nextMarker === -1 ? remainingText.length : nextMarker;
      
      if (textEnd > 0) {
        tokens.push({
          type: 'text',
          content: remainingText.slice(0, textEnd),
          start: currentPosition,
          end: currentPosition + textEnd
        });
        currentPosition += textEnd;
      } else {
        currentPosition++;
      }
    }
  }

  return tokens;
};
