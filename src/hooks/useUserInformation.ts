import { useState, useEffect } from 'react';
import { getUserInformation } from '../services/userInformationService';

interface UseUserInformationResult {
  userInformation: string;
  isLoading: boolean;
  error: string | null;
  isTypingComplete: boolean;
  displayedText: string;
}

export const useUserInformation = (handle: string): UseUserInformationResult => {
  const [userInformation, setUserInformation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  // Fetch user information
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getUserInformation(handle);
        setUserInformation(response.user_information);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user information');
        setIsLoading(false);
      }
    };

    fetchUserInformation();
  }, [handle]);

  // Typewriter effect
  useEffect(() => {
    if (!userInformation || isLoading) return;

    let currentIndex = 0;
    setIsTypingComplete(false);
    setDisplayedText('');

    const typingInterval = setInterval(() => {
      if (currentIndex < userInformation.length) {
        // Safely access the character at the current index
        const nextChar = userInformation.charAt(currentIndex);
        setDisplayedText(prev => prev + nextChar);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 20); // Adjust typing speed as needed

    return () => clearInterval(typingInterval);
  }, [userInformation, isLoading]);

  return {
    userInformation,
    isLoading,
    error,
    isTypingComplete,
    displayedText
  };
};
