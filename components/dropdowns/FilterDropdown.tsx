import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Filter, X, Calendar, Globe, User } from "lucide-react";

const FilterDropdown = ({
  onFiltersChange,
  initialFilters = {},
  availableCategories = [],
  availableSources = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    source: "",
    author: "",
    dateRange: "",
    sortBy: "publishedAt",
    sortOrder: "desc",
    ...initialFilters,
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: "",
      source: "",
      author: "",
      dateRange: "",
      sortBy: "publishedAt",
      sortOrder: "desc",
    };
    setFilters(clearedFilters);
    if (onFiltersChange) {
      onFiltersChange(clearedFilters);
    }
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value !== "publishedAt" && value !== "desc"
  );

  const getActiveFilterCount = () => {
    return Object.entries(filters).filter(
      ([key, value]) => value && key !== "sortBy" && key !== "sortOrder"
    ).length;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
          hasActiveFilters
            ? "bg-blue-50 border-blue-200 text-blue-700"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {getActiveFilterCount() > 0 && (
          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
            {getActiveFilterCount()}
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Filter Articles
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Globe className="h-4 w-4" />
                  <span>Category</span>
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Globe className="h-4 w-4" />
                  <span>Source</span>
                </label>
                <select
                  value={filters.source}
                  onChange={(e) => handleFilterChange("source", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Sources</option>
                  {availableSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4" />
                  <span>Author</span>
                </label>
                <input
                  type="text"
                  value={filters.author}
                  onChange={(e) => handleFilterChange("author", e.target.value)}
                  placeholder="Enter author name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Date Range</span>
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    handleFilterChange("dateRange", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Sort By
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="publishedAt">Date</option>
                    <option value="title">Title</option>
                    <option value="source">Source</option>
                  </select>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) =>
                      handleFilterChange("sortOrder", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
