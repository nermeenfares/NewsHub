"use client";

import React, { memo, useRef, useEffect } from "react";
import gsap from "gsap";
import { Article } from "@/types";
import {
  formatPublishedDate,
  generateExcerpt,
  hasValidImage,
  getFallbackImage,
} from "@/utils/articleHelpers";
import { ANIMATION_DURATION, ANIMATION_STAGGER } from "@/utils/constants";

interface AnimatedArticleGridProps {
  articles: Article[];
  columns?: number;
  onArticleClick: (article: Article) => void;
  loading?: boolean;
}

const AnimatedArticleGrid = memo(function AnimatedArticleGrid({
  articles,
  columns = 3,
  onArticleClick,
  loading = false,
}: AnimatedArticleGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && articles.length > 0 && gridRef.current) {
      const articleElements = gridRef.current.children;

      gsap.fromTo(
        articleElements,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION_DURATION,
          stagger: ANIMATION_STAGGER,
          ease: "power2.out",
        }
      );
    }
  }, [articles, loading]);

  const getGridClasses = () => {
    const baseClasses = "grid gap-6";
    switch (columns) {
      case 1:
        return `${baseClasses} grid-cols-1`;
      case 2:
        return `${baseClasses} grid-cols-1 md:grid-cols-2`;
      case 4:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
      default:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
    }
  };

  if (loading) {
    return (
      <div className={getGridClasses()}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-48 bg-gray-200" />
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
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No articles found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div ref={gridRef} className={getGridClasses()}>
      {articles.map((article, index) => (
        <ArticleCard
          key={`${article.id}-${index}`}
          article={article}
          onClick={() => onArticleClick(article)}
        />
      ))}
    </div>
  );
});

const ArticleCard = memo(function ArticleCard({
  article,
  onClick,
}: {
  article: Article;
  onClick: () => void;
}) {
  const imageUrl = hasValidImage(article)
    ? article.urlToImage!
    : getFallbackImage(article.category);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />

        {article.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 capitalize">
              {article.category}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {generateExcerpt(article, 120)}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{article.source.name}</span>
            {article.author && (
              <>
                <span>•</span>
                <span>{article.author}</span>
              </>
            )}
          </div>
          <time dateTime={article.publishedAt}>
            {formatPublishedDate(article.publishedAt)}
          </time>
        </div>
      </div>
    </div>
  );
});

export default AnimatedArticleGrid;
