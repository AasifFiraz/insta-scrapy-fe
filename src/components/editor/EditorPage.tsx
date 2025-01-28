import React from 'react';
import { Editor } from './Editor';

export const EditorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-24 px-4 pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/5 rounded-xl p-4 sm:p-6">
          <Editor />
        </div>
      </div>
    </div>
  );
};