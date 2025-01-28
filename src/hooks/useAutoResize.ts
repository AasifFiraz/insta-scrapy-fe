import { useEffect, RefObject } from 'react';

export const useAutoResize = (ref: RefObject<HTMLTextAreaElement>) => {
  useEffect(() => {
    const textarea = ref.current;
    if (!textarea) return;

    const adjustHeight = () => {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set the height to match the content
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    // Initial resize
    adjustHeight();

    // Add event listeners
    textarea.addEventListener('input', adjustHeight);
    window.addEventListener('resize', adjustHeight);

    // Cleanup
    return () => {
      textarea.removeEventListener('input', adjustHeight);
      window.removeEventListener('resize', adjustHeight);
    };
  }, [ref]);
};