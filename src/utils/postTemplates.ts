export const getPostStructure = (type: string) => {
  switch (type) {
    case 'carousel':
      return `1. Hook slide (problem/pain point)\n2. Agitate the problem\n3. Present the solution\n4. Break down key points\n5. Share proof/results\n6. Call to action`;
    case 'reel':
      return `1. Hook (first 3 seconds)\n2. Identify problem\n3. Share solution\n4. Give quick tips\n5. End with CTA`;
    default:
      return `1. Strong visual\n2. Clear headline\n3. Key benefit\n4. Call to action`;
  }
};

export const getCaptionStructure = (type: string) => {
  switch (type) {
    case 'carousel':
      return `🎯 Hook\n\n💡 Main point\n\nKey points:\n• Point 1\n• Point 2\n• Point 3\n\n🔑 Key takeaway\n\n👉 Call to action\n\n#hashtags`;
    case 'reel':
      return `🎬 Hook question\n\n💡 Main insight\n\n✨ Quick tips:\n1. Tip one\n2. Tip two\n3. Tip three\n\n👉 CTA\n\n#hashtags`;
    default:
      return `💡 Hook statement\n\nMain point expanded\n\n🎯 Key takeaway\n\n👉 Call to action\n\n#hashtags`;
  }
};

export const getPostCopy = (type: string) => {
  switch (type) {
    case 'carousel':
      return `Slide 1: "Stop losing customers! 🛑"\n\nSlide 2: "68% of businesses lose customers due to poor follow-up..."\n\nSlide 3: "Introducing the 3-Step Follow-Up Framework"\n\nSlide 4: "Step 1: 24-Hour Check-in"\n\nSlide 5: "Step 2: Value-Add Message"\n\nSlide 6: "Step 3: Feedback Loop"\n\nSlide 7: "Start implementing today! 👇"`;
    case 'reel':
      return `[Hook]: "The ONE thing killing your sales..."\n\n[Problem]: "Most businesses focus on getting new customers..."\n\n[Solution]: "But the real money is in customer retention!"\n\n[Tips]:\n1. "Follow up within 24 hours"\n2. "Send value, not just promotions"\n3. "Ask for feedback"\n\n[CTA]: "Double tap if this helped!"`;
    default:
      return `[Headline]: "Stop Losing Customers!"\n\n[Subtext]: "Implement this proven follow-up system"\n\n[CTA]: "Save this post for later 👆"`;
  }
};

export const getCaptionCopy = (type: string) => {
  switch (type) {
    case 'carousel':
      return `🚨 The Silent Business Killer: Poor Follow-Up 🚨\n\nYou're leaving money on the table if you're not following up properly with your customers.\n\nIn this guide, I'm sharing my proven 3-step framework that helped us:\n• Increase customer retention by 47%\n• Boost repeat purchases by 83%\n• Generate 122% more referrals\n\nSave this post and implement these steps TODAY!\n\n👉 Follow @youraccount for more business growth tips\n\n#BusinessGrowth #CustomerRetention #SalesStrategy`;
    case 'reel':
      return `🎯 Want to know the REAL reason most businesses struggle with sales?\n\nIt's not what you think...\n\nMost focus on getting new customers, but the goldmine is in KEEPING them!\n\nSave this video to learn:\n✅ The perfect timing for follow-ups\n✅ What messages actually convert\n✅ How to turn customers into raving fans\n\n👉 Follow @youraccount for daily business tips\n\n#BusinessTips #SalesStrategy #Entrepreneurship`;
    default:
      return `💡 The ONE system that transformed our business...\n\nSwipe up to learn how we:\n✅ Increased retention by 47%\n✅ Boosted sales by 83%\n✅ Generated 122% more referrals\n\nAll with a simple 3-step follow-up framework!\n\n👉 Follow @youraccount for more strategies\n\n#BusinessGrowth #Entrepreneurship #Success`;
  }
};