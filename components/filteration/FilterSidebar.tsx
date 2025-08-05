"use client";

import React, { memo, useState } from "react";
import { SearchFilters } from "@/types";

import {
  DATE_RANGE_OPTIONS,
  SORT_OPTIONS,
  SORT_ORDER_OPTIONS,
  MAX_VISIBLE_FILTERS,
} from "@/utils/constants";

interface FiltersSidebarProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
  availableCategories: string[];
  availableSources: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedSources: string[];
  onSourceChange: (sources: string[]) => void;
}

const FiltersSidebar = memo(function FiltersSidebar({
  onFiltersChange,
  initialFilters,
  availableCategories,
  availableSources,
  selectedCategories,
  onCategoryChange,
  selectedSources,
  onSourceChange,
}: FiltersSidebarProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllSources, setShowAllSources] = useState(false);
  const [sourceSearchQuery, setSourceSearchQuery] = useState("");

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newCategories);
  };

  const handleSourceToggle = (source: string) => {
    const newSources = selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source];
    onSourceChange(newSources);
  };

  const filteredSources = availableSources.filter((source) =>
    source.toLowerCase().includes(sourceSearchQuery.toLowerCase())
  );

  const visibleCategories = showAllCategories
    ? availableCategories
    : availableCategories.slice(0, MAX_VISIBLE_FILTERS);

  const visibleSources = showAllSources
    ? filteredSources
    : filteredSources.slice(0, MAX_VISIBLE_FILTERS);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Advanced Filters</h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={filters.author}
              onChange={(e) => handleFilterChange("author", e.target.value)}
              placeholder="Filter by author name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="dateRange"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date Range
            </label>
            <select
              id="dateRange"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {DATE_RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              value={filters.sortBy}
              onChange={(e) =>
                handleFilterChange(
                  "sortBy",
                  e.target.value as SearchFilters["sortBy"]
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="sortOrder"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort Order
            </label>
            <select
              id="sortOrder"
              value={filters.sortOrder}
              onChange={(e) =>
                handleFilterChange(
                  "sortOrder",
                  e.target.value as SearchFilters["sortOrder"]
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {SORT_ORDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {availableCategories.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Categories</h3>

          <div className="space-y-2">
            {visibleCategories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {category}
                </span>
              </label>
            ))}
          </div>

          {availableCategories.length > MAX_VISIBLE_FILTERS && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800"
            >
              {showAllCategories
                ? "Show Less"
                : `Show All (${availableCategories.length})`}
            </button>
          )}
        </div>
      )}

      {availableSources.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Sources</h3>

          <div className="mb-4">
            <input
              type="text"
              value={sourceSearchQuery}
              onChange={(e) => setSourceSearchQuery(e.target.value)}
              placeholder="Search sources..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {visibleSources.map((source) => (
              <label key={source} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSources.includes(source)}
                  onChange={() => handleSourceToggle(source)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{source}</span>
              </label>
            ))}
          </div>

          {filteredSources.length > MAX_VISIBLE_FILTERS && (
            <button
              onClick={() => setShowAllSources(!showAllSources)}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800"
            >
              {showAllSources
                ? "Show Less"
                : `Show All (${filteredSources.length})`}
            </button>
          )}

          {filteredSources.length === 0 && sourceSearchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              No sources found matching "{sourceSearchQuery}"
            </p>
          )}
        </div>
      )}
    </div>
  );
});

export default FiltersSidebar;
