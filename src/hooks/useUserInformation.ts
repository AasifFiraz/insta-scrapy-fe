import { useState, useEffect } from 'react';
import { getUserInformation } from '../services/userInformationService';

interface UseUserInformationResult {
  userInformation: string;
  isLoading: boolean;
  error: string | null;
  isTypingComplete: boolean;
  displayedText: string;
  completeTyping: () => void; // New function to force complete the typing animation
}

export const useUserInformation = (handle: string): UseUserInformationResult => {
  const [userInformation, setUserInformation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [forceComplete, setForceComplete] = useState<boolean>(false);

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

  // Function to force complete the typing animation
  const completeTyping = () => {
    setForceComplete(true);
  };

  // Typewriter effect
  useEffect(() => {
    if (!userInformation || isLoading) return;

    // If force complete is triggered, immediately show the full text
    if (forceComplete) {
      setDisplayedText(userInformation);
      setIsTypingComplete(true);
      return;
    }

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
  }, [userInformation, isLoading, forceComplete]);

  return {
    userInformation,
    isLoading,
    error,
    isTypingComplete,
    displayedText,
    completeTyping
  };
};
