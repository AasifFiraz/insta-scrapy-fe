import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchResult } from "./SearchResult";
import { useDebounce } from "../../hooks/useDebounce";

const URL = process.env.NODE_ENV === "production" ? "https://postlyze.com/" : "http://localhost:5000/";


interface SearchResult {
  username: string;
  fullName: string;
  profilePic: string;
  biography: string;
  followers: number;
}

interface SearchDropdownProps {
  query: string;
  selectedIndex: number;
  onSelect: (handle: string) => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  query,
  selectedIndex,
  onSelect,
}) => {
  const navigate = useNavigate();
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedQuery = useDebounce(query, 1000);

  React.useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `${URL}api/search/profiles?q=${encodeURIComponent(debouncedQuery)}`
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSeeAllResults = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl overflow-hidden z-50">
      {/* See all results button */}
      <div className="p-3 border-b border-gray-100">
        <div
          onClick={handleSeeAllResults}
          className={`relative w-full rounded-lg p-2 flex items-center justify-between text-gray-900 cursor-pointer group ${
            selectedIndex === -1 ? "bg-gray-50" : "hover:bg-gray-50"
          }`}
        >
          <span className="text-sm">See all results for "{query}"</span>
          <span className="text-xs text-gray-500">Press Enter ↵</span>
        </div>
      </div>

      {/* Search Results */}
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-2">Suggested Profiles</p>
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 animate-pulse"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-1">
            {results.map((result, index) => (
              <SearchResult
                key={result.username}
                username={result.username}
                fullName={result.fullName}
                profilePic={result.profilePic}
                isSelected={index === selectedIndex}
                onSelect={() => onSelect(result.username)}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-4">No results found</div>
        )}
      </div>

      {/* See all button at bottom */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleSeeAllResults}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          See all results
        </button>
      </div>
    </div>
  );
};
