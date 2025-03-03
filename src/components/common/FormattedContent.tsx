import React from 'react';

interface FormattedContentProps {
  content: string;
  contentType: 'post' | 'caption' | 'postStructure' | 'captionStructure';
}

export const FormattedContent: React.FC<FormattedContentProps> = ({
  content,
  contentType
}) => {
  if (contentType !== 'post') {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  // Check if content is in numbered format
  const isNumberedFormat = /^\d+\.\s/.test(content);

  if (!isNumberedFormat) {
    // Check if content appears to be a conversation (contains "Speaker" or similar patterns)
    const isConversationFormat = /Speaker \d+:|Speaker:/.test(content);
    
    if (isConversationFormat) {
      // For conversation format, preserve line breaks
      const lines = content.split('\n').filter(line => line.trim().length > 0);
      
      return (
        <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
          {lines.map((line, index) => {
            // Check if this line starts with a speaker indicator
            const isSpeakerLine = /Speaker \d+:|Speaker:/.test(line);
            
            return (
              <div key={index} className={isSpeakerLine ? "mt-3 first:mt-0" : ""}>
                <p className={`text-base leading-relaxed ${isSpeakerLine ? "text-white font-medium" : "text-white/90"}`}>
                  {line}
                </p>
              </div>
            );
          })}
        </div>
      );
    } else {
      // For regular non-numbered, non-conversation content, preserve line breaks
      const paragraphs = content
        .split('\n')
        .filter(line => line.trim().length > 0);
      
      return (
        <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-white/90 mb-2 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      );
    }
  }

  // For numbered format, first split the content at numbers
  const sections = content.split(/(?=\d+\.\s)/);
  
  // Process each section
  const items = sections
    .filter(Boolean)
    .map(section => {
      // Extract number and content
      const match = section.match(/^(\d+)\.\s*([\s\S]+)/);
      if (!match) return null;

      const [, numberStr, contentText] = match;
      const number = parseInt(numberStr);

      // Clean up the content - remove excess whitespace and join lines
      const cleanContent = contentText
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
        .join(' ')
        .trim();

      // Check if this is a social media post format
      const isSocialPost = cleanContent.includes('@') && cleanContent.split('@').length === 2;

      if (isSocialPost) {
        const [author, ...messageParts] = cleanContent.split('@');
        const messageText = messageParts.join('@'); // Rejoin in case there are @ symbols in the message
        const [handle, ...message] = messageText.split(' ');
        
        return {
          number,
          type: 'social',
          author: author.trim(),
          handle: '@' + handle.trim(),
          message: message.join(' ').trim()
        };
      }

      return {
        number,
        type: 'general',
        content: cleanContent
      };
    })
    .filter(Boolean);

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div
          key={item!.number}
          className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-500 flex items-center justify-center text-white text-sm font-medium">
              {item!.number}
            </div>
            <div className="flex-1">
              {item!.type === 'social' ? (
                <div className="flex flex-col">
                  <span className="text-white font-medium">{item!.author}</span>
                  <span className="text-gray-400 text-sm mb-2">{item!.handle}</span>
                  <p className="text-base leading-relaxed text-white/90">
                    {item!.message}
                  </p>
                </div>
              ) : (
                <p className="text-base leading-relaxed text-white/90">
                  {item!.content}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 