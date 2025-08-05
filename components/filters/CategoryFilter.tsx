import React, { useState } from "react";
import { Tag, Check } from "lucide-react";

const CategoryFilter = ({
  categories = [],
  selectedCategories = [],
  onCategoryChange,
  maxVisible = 8,
  showAll = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(showAll);

  const defaultCategories = [
    "General",
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
    "World",
  ];

  const allCategories = categories.length > 0 ? categories : defaultCategories;
  const visibleCategories = isExpanded
    ? allCategories
    : allCategories.slice(0, maxVisible);

  const handleCategoryToggle = (category: string) => {
    const isSelected = selectedCategories.includes(category);
    let newSelection;

    if (isSelected) {
      newSelection = selectedCategories.filter((c) => c !== category);
    } else {
      newSelection = [...selectedCategories, category];
    }

    if (onCategoryChange) {
      onCategoryChange(newSelection);
    }
  };

  const clearAll = () => {
    if (onCategoryChange) {
      onCategoryChange([]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Tag className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        </div>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {visibleCategories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-200 ${
                isSelected
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-sm font-medium">{category}</span>
              {isSelected && <Check className="h-4 w-4 text-blue-600" />}
            </button>
          );
        })}
      </div>

      {allCategories.length > maxVisible && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            {isExpanded
              ? "Show Less"
              : `Show ${allCategories.length - maxVisible} More`}
          </button>
        </div>
      )}

      {selectedCategories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2">
            Selected ({selectedCategories.length}):
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {category}
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
