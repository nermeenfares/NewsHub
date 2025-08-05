"use client";

import React, { memo, useState, useRef, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalstorage";
import {
  DEFAULT_RECENT_SEARCHES,
  MAX_RECENT_SEARCHES,
} from "@/utils/constants";

interface SearchSectionProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
  showFilters?: boolean;
}

const SearchSection = memo(function SearchSection({
  onSearch,
  onClear,
  placeholder = "Search articles, authors, or categories...",
  showFilters = true,
}: SearchSectionProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage(
    "recent-searches",
    DEFAULT_RECENT_SEARCHES
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
    }
  };

  const performSearch = (searchQuery: string) => {
    onSearch(searchQuery);

    if (!recentSearches.includes(searchQuery)) {
      const updatedSearches = [
        searchQuery,
        ...recentSearches.slice(0, MAX_RECENT_SEARCHES - 1),
      ];
      setRecentSearches(updatedSearches);
    }

    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery("");
    onClear();
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    setShowSuggestions(value.length > 0 || recentSearches.length > 0);
  };

  const handleInputFocus = () => {
    if (recentSearches.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = recentSearches.filter((search) =>
    search.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Search
        </button>
      </form>

      {showSuggestions && (query || recentSearches.length > 0) && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {query && filteredSuggestions.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Press Enter to search for "{query}"
            </div>
          )}

          {filteredSuggestions.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                Recent Searches
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <svg
                    className="h-4 w-4 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {suggestion}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default SearchSection;
