import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface UserInformationProps {
  text: string;
  isLoading: boolean;
}

export const UserInformation: React.FC<UserInformationProps> = ({ text, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-6 w-6 rounded-full border-2 border-white/20 border-t-white/80 animate-spin"></div>
          <div className="text-white/80 font-medium">Loading user information...</div>
        </div>
        <div className="space-y-4 animate-pulse">
          <div className="h-6 bg-white/5 rounded w-3/4"></div>
          <div className="h-4 bg-white/5 rounded w-full"></div>
          <div className="h-4 bg-white/5 rounded w-5/6"></div>
          <div className="h-4 bg-white/5 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <div className="mb-6 text-white/90 prose prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({...props}) => <h1 className="text-2xl font-bold mb-3 text-white" {...props} />,
          h2: ({...props}) => <h2 className="text-xl font-semibold mb-2 mt-4 text-white/90" {...props} />,
          p: ({...props}) => <p className="mb-3 text-white/80" {...props} />,
          strong: ({...props}) => <strong className="font-bold text-white" {...props} />,
          em: ({...props}) => <em className="italic text-white/90" {...props} />
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
