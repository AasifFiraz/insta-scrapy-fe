import { useState, useEffect, KeyboardEvent } from 'react';

interface UseKeyboardNavigationProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  isOpen: boolean;
}

export function useKeyboardNavigation<T>({ 
  items, 
  onSelect,
  isOpen 
}: UseKeyboardNavigationProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Reset selection when items change or dropdown closes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [items, isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < items.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > -1 ? prev - 1 : prev
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onSelect(items[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setSelectedIndex(-1);
        break;
    }
  };

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  };
}