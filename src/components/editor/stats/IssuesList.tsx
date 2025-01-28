import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface IssuesListProps {
  stats: {
    hardToRead: number;
    veryHardToRead: number;
    adverbs: number;
    passiveVoice: number;
    complexWords: number;
  };
}

export const IssuesList: React.FC<IssuesListProps> = ({ stats }) => {
  const [hiddenIssues, setHiddenIssues] = React.useState<Set<string>>(new Set());

  const toggleIssue = (type: string) => {
    const newHidden = new Set(hiddenIssues);
    if (newHidden.has(type)) {
      newHidden.delete(type);
    } else {
      newHidden.add(type);
    }
    setHiddenIssues(newHidden);
  };

  const issues = [
    {
      type: 'veryHardToRead',
      label: 'Very Hard to Read',
      count: stats.veryHardToRead,
      color: 'text-red-500'
    },
    {
      type: 'hardToRead',
      label: 'Hard to Read',
      count: stats.hardToRead,
      color: 'text-yellow-500'
    },
    {
      type: 'adverbs',
      label: 'Adverbs',
      count: stats.adverbs,
      color: 'text-blue-500'
    },
    {
      type: 'passiveVoice',
      label: 'Passive Voice',
      count: stats.passiveVoice,
      color: 'text-blue-500'
    },
    {
      type: 'complexWords',
      label: 'Complex Words',
      count: stats.complexWords,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-2">
      {issues.map(issue => (
        <div 
          key={issue.type}
          className="flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleIssue(issue.type)}
              className="p-1 rounded hover:bg-white/5 text-gray-400 hover:text-white"
            >
              {hiddenIssues.has(issue.type) ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            <span className={`text-sm ${issue.color}`}>
              {issue.label}
            </span>
          </div>
          <span className="text-sm text-gray-400">
            {issue.count}
          </span>
        </div>
      ))}
    </div>
  );
};
