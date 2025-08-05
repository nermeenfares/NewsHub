"use client";

import React, { memo, useState, Suspense, lazy } from "react";
import { Article, ViewMode } from "@/types";
import ArticleList from "@/components/ArticleList";
import ErrorMessage from "@/components/ErrorMessage";

const AnimatedArticleGrid = lazy(
  () => import("@/components/lazy/AnimatedArticleGrid")
);
const PaginationComponent = lazy(
  () => import("@/components/lazy/PaginationComponent")
);

interface ArticlesDisplayProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
  onArticleClick: (article: Article) => void;
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: { selected: number }) => void;
}

const ArticlesDisplay = memo(function ArticlesDisplay({
  articles,
  loading,
  error,
  onArticleClick,
  pageCount,
  currentPage,
  onPageChange,
}: ArticlesDisplayProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const LoadingSkeleton = memo(() => (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div
            className={`bg-gray-200 ${viewMode === "grid" ? "h-48" : "h-32"}`}
          />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {articles.length} article{articles.length !== 1 ? "s" : ""} found
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Grid view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="List view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <ErrorMessage
          type="error"
          message={error}
          onRetry={() => window.location.reload()}
        />
      )}

      {loading && <LoadingSkeleton />}

      {!loading && !error && (
        <>
          {viewMode === "grid" ? (
            <Suspense fallback={<LoadingSkeleton />}>
              <AnimatedArticleGrid
                articles={articles}
                columns={3}
                onArticleClick={onArticleClick}
                loading={loading}
              />
            </Suspense>
          ) : (
            <ArticleList
              articles={articles}
              onArticleClick={onArticleClick}
              loading={loading}
              error={error}
            />
          )}

          {pageCount > 1 && (
            <Suspense
              fallback={
                <div className="h-16 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              }
            >
              <PaginationComponent
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </Suspense>
          )}
        </>
      )}
    </div>
  );
});

export default ArticlesDisplay;
