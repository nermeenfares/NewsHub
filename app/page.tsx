"use client";

import React, { memo, useState, Suspense, lazy } from "react";
import { Article, ShareData } from "@/types";
import { useArticleData } from "@/hooks/useArticleData";

import { DEFAULT_RECENT_SEARCHES } from "@/utils/constants";
import { useArticleFilters } from "@/hooks/useArticleFilter";
import SearchSection from "@/components/client/SearchSection";
import FiltersSidebar from "@/components/filteration/FilterSidebar";
import ArticlesDisplay from "@/components/ArticlesDisplay/articleDisplay";
import { useLocalStorage } from "@/hooks/useLocalstorage";
import { usePagination } from "@/hooks/usePagination";

const ArticleDetails = lazy(
  () => import("@/components/ArticleDetails/ArticleDetails")
);

const HomePage = memo(function HomePage() {
  const { articles, loading, error, availableCategories, availableSources } =
    useArticleData();
  console.log(articles?.length);
  const {
    filteredArticles,
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedSources,
    setSelectedSources,
    filters,
    setFilters,
    clearAllFilters,
  } = useArticleFilters(articles);

  const {
    currentPage,
    pageCount,
    currentItems: currentArticles,
    handlePageChange,
  } = usePagination(filteredArticles);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [recentSearches, setRecentSearches] = useLocalStorage(
    "recent-searches",
    DEFAULT_RECENT_SEARCHES
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query && !recentSearches.includes(query)) {
      const updatedSearches = [query, ...recentSearches.slice(0, 4)];
      setRecentSearches(updatedSearches);
    }
  };

  const handleShare = ({ title, description, url }: ShareData) => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: description,
          url,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(url).catch(console.error);
    }
  };

  if (selectedArticle) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <ArticleDetails
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            onShare={handleShare}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h1>
        <p className="text-gray-600">
          Stay informed with the latest news from trusted sources.
        </p>
      </div>

      <SearchSection
        onSearch={handleSearch}
        onClear={() => setSearchQuery("")}
        placeholder="Search articles, authors, or categories..."
        showFilters={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FiltersSidebar
            onFiltersChange={setFilters}
            initialFilters={filters}
            availableCategories={availableCategories}
            availableSources={availableSources}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            selectedSources={selectedSources}
            onSourceChange={setSelectedSources}
          />

          {(searchQuery ||
            selectedCategories.length ||
            selectedSources.length ||
            filters.author ||
            filters.dateRange) && (
            <div className="mt-4">
              <button
                onClick={clearAllFilters}
                className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-3">
          <ArticlesDisplay
            articles={currentArticles}
            loading={loading}
            error={error}
            onArticleClick={setSelectedArticle}
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
});

export default HomePage;
