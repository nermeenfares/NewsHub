import React, { useState } from "react";
import { Globe, Check, Search } from "lucide-react";

const SourceFilter = ({
  sources = [],
  selectedSources = [],
  onSourceChange,
  maxVisible = 6,
  showAll = false,
  showSearch = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(showAll);
  const [searchQuery, setSearchQuery] = useState("");

  const defaultSources = [
    "BBC News",
    "CNN",
    "Reuters",
    "Associated Press",
    "The Guardian",
    "New York Times",
    "Washington Post",
    "NPR",
    "Fox News",
    "ABC News",
  ];

  const allSources = sources.length > 0 ? sources : defaultSources;

  const filteredSources = searchQuery
    ? allSources.filter((source) =>
        source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSources;

  const visibleSources = isExpanded
    ? filteredSources
    : filteredSources.slice(0, maxVisible);

  const handleSourceToggle = (source) => {
    const isSelected = selectedSources.includes(source);
    let newSelection;

    if (isSelected) {
      newSelection = selectedSources.filter((s) => s !== source);
    } else {
      newSelection = [...selectedSources, source];
    }

    if (onSourceChange) {
      onSourceChange(newSelection);
    }
  };

  const clearAll = () => {
    if (onSourceChange) {
      onSourceChange([]);
    }
  };

  const selectAll = () => {
    if (onSourceChange) {
      onSourceChange([...allSources]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">News Sources</h3>
        </div>
        <div className="flex items-center space-x-2">
          {selectedSources.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Clear all
            </button>
          )}
          {selectedSources.length < allSources.length && (
            <button
              onClick={selectAll}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Select all
            </button>
          )}
        </div>
      </div>

      {showSearch && allSources.length > 10 && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sources..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div className="space-y-2">
        {visibleSources.map((source) => {
          const isSelected = selectedSources.includes(source);
          return (
            <button
              key={source}
              onClick={() => handleSourceToggle(source)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-200 ${
                isSelected
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-sm font-medium text-left">{source}</span>
              {isSelected && (
                <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {filteredSources.length > maxVisible && !searchQuery && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            {isExpanded
              ? "Show Less"
              : `Show ${filteredSources.length - maxVisible} More`}
          </button>
        </div>
      )}

      {searchQuery && filteredSources.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <p>No sources found for "{searchQuery}"</p>
        </div>
      )}

      {selectedSources.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2">
            Selected ({selectedSources.length}):
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSources.slice(0, 5).map((source) => (
              <span
                key={source}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {source}
                <button
                  onClick={() => handleSourceToggle(source)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
            {selectedSources.length > 5 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{selectedSources.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SourceFilter;
