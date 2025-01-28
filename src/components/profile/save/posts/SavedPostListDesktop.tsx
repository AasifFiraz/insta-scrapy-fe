import React, { useState } from 'react';
import { FileText, AlignLeft, Copy, Check, FileCode, MessageSquare } from 'lucide-react';
import { Post } from '../../../../types/post';
import { formatNumber } from '../../../../utils/numberFormat';
import { formatDistanceToNow } from '../../../../utils/dateFormat';

interface SavedPostListDesktopProps {
  posts: Post[];
  onShowStructure: (text: string) => void;
}

interface PopupContent {
  type: 'post' | 'caption' | 'postStructure' | 'captionStructure';
  text: string;
  postType: string;
  title: string;
}

export const SavedPostListDesktop: React.FC<SavedPostListDesktopProps> = ({ posts }) => {
  const [selectedContent, setSelectedContent] = useState<PopupContent | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!selectedContent) return;
    
    try {
      await navigator.clipboard.writeText(selectedContent.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const showContent = (type: PopupContent['type'], postType: string) => {
    let text = '';
    let title = '';

    switch (type) {
      case 'post':
        text = getPostCopy(postType);
        title = 'Post Copy';
        break;
      case 'caption':
        text = getCaptionCopy(postType);
        title = 'Caption Copy';
        break;
      case 'postStructure':
        text = getPostStructure(postType);
        title = 'Post Structure';
        break;
      case 'captionStructure':
        text = getCaptionStructure(postType);
        title = 'Caption Structure';
        break;
    }
    
    setSelectedContent({ type, text, postType, title });
  };

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-white/10">
            <th className="pb-3 font-medium">Title</th>
            <th className="pb-3 font-medium">Posted</th>
            <th className="pb-3 font-medium">Topic</th>
            <th className="pb-3 font-medium">Goal</th>
            <th className="pb-3 font-medium">Angle</th>
            <th className="pb-3 font-medium text-center">Likes</th>
            <th className="pb-3 font-medium text-center">Comments</th>
            <th className="pb-3 font-medium text-center">Copy</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {posts.map(post => (
            <tr key={post.id} className="border-b border-white/5">
              <td className="py-4 pr-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={post.thumbnail} 
                    alt={post.caption}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <span className="text-white line-clamp-2">{post.caption}</span>
                </div>
              </td>
              <td className="py-4 text-gray-300">
                {formatDistanceToNow(new Date(post.createdAt))}
              </td>
              <td className="py-4 text-gray-300">
                {post.topic || 'Business Growth'}
              </td>
              <td className="py-4 text-gray-300">
                {post.goal || 'Engagement'}
              </td>
              <td className="py-4 text-gray-300">
                {post.angle || 'How-to'}
              </td>
              <td className="py-4 text-center text-gray-300">
                {formatNumber(post.stats.likes)}
              </td>
              <td className="py-4 text-center text-gray-300">
                {formatNumber(post.stats.comments)}
              </td>
              <td className="py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => showContent('post', post.type)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    title="Post Copy"
                  >
                    <FileCode className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showContent('caption', post.type)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    title="Caption Copy"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showContent('postStructure', post.type)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    title="Post Structure"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showContent('captionStructure', post.type)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    title="Caption Structure"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Content Popup */}
      {selectedContent && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setSelectedContent(null)}
          />
          
          {/* Centered Popup */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="relative bg-black border border-white/10 rounded-lg shadow-xl p-6 w-[800px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
              {/* Magical outline/glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl -z-10" />
              <div className="absolute inset-0 rounded-lg border border-white/20 shadow-[0_0_15px_rgba(236,72,153,0.1)] -z-10" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {selectedContent.title}
                </h3>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Content */}
              <div className="text-white whitespace-pre-wrap text-base leading-relaxed">
                {selectedContent.text}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Helper functions for post and caption structure/copy
const getPostStructure = (type: string) => {
  switch (type) {
    case 'carousel':
      return `1. Hook slide (problem/pain point)\n2. Agitate the problem\n3. Present the solution\n4. Break down key points\n5. Share proof/results\n6. Call to action`;
    case 'reel':
      return `1. Hook (first 3 seconds)\n2. Identify problem\n3. Share solution\n4. Give quick tips\n5. End with CTA`;
    default:
      return `1. Strong visual\n2. Clear headline\n3. Key benefit\n4. Call to action`;
  }
};

const getCaptionStructure = (type: string) => {
  switch (type) {
    case 'carousel':
      return `🎯 Hook\n\n💡 Main point\n\nKey points:\n• Point 1\n• Point 2\n• Point 3\n\n🔑 Key takeaway\n\n👉 Call to action\n\n#hashtags`;
    case 'reel':
      return `🎬 Hook question\n\n💡 Main insight\n\n✨ Quick tips:\n1. Tip one\n2. Tip two\n3. Tip three\n\n👉 CTA\n\n#hashtags`;
    default:
      return `💡 Hook statement\n\nMain point expanded\n\n🎯 Key takeaway\n\n👉 Call to action\n\n#hashtags`;
  }
};

const getPostCopy = (type: string) => {
  switch (type) {
    case 'carousel':
      return `Slide 1: "Stop losing customers! 🛑"\n\nSlide 2: "68% of businesses lose customers due to poor follow-up..."\n\nSlide 3: "Introducing the 3-Step Follow-Up Framework"\n\nSlide 4: "Step 1: 24-Hour Check-in"\n\nSlide 5: "Step 2: Value-Add Message"\n\nSlide 6: "Step 3: Feedback Loop"\n\nSlide 7: "Start implementing today! 👇"`;
    case 'reel':
      return `[Hook]: "The ONE thing killing your sales..."\n\n[Problem]: "Most businesses focus on getting new customers..."\n\n[Solution]: "But the real money is in customer retention!"\n\n[Tips]:\n1. "Follow up within 24 hours"\n2. "Send value, not just promotions"\n3. "Ask for feedback"\n\n[CTA]: "Double tap if this helped!"`;
    default:
      return `[Headline]: "Stop Losing Customers!"\n\n[Subtext]: "Implement this proven follow-up system"\n\n[CTA]: "Save this post for later 👆"`;
  }
};

const getCaptionCopy = (type: string) => {
  switch (type) {
    case 'carousel':
      return `🚨 The Silent Business Killer: Poor Follow-Up 🚨\n\nYou're leaving money on the table if you're not following up properly with your customers.\n\nIn this guide, I'm sharing my proven 3-step framework that helped us:\n• Increase customer retention by 47%\n• Boost repeat purchases by 83%\n• Generate 122% more referrals\n\nSave this post and implement these steps TODAY!\n\n👉 Follow @youraccount for more business growth tips\n\n#BusinessGrowth #CustomerRetention #SalesStrategy`;
    case 'reel':
      return `🎯 Want to know the REAL reason most businesses struggle with sales?\n\nIt's not what you think...\n\nMost focus on getting new customers, but the goldmine is in KEEPING them!\n\nSave this video to learn:\n✅ The perfect timing for follow-ups\n✅ What messages actually convert\n✅ How to turn customers into raving fans\n\n👉 Follow @youraccount for daily business tips\n\n#BusinessTips #SalesStrategy #Entrepreneurship`;
    default:
      return `💡 The ONE system that transformed our business...\n\nSwipe up to learn how we:\n✅ Increased retention by 47%\n✅ Boosted sales by 83%\n✅ Generated 122% more referrals\n\nAll with a simple 3-step follow-up framework!\n\n👉 Follow @youraccount for more strategies\n\n#BusinessGrowth #Entrepreneurship #Success`;
  }
};