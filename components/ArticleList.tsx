import React from "react";
import ErrorMessage from "./ErrorMessage";
import { ArticleListProps } from "@/types";
import { LoaderIcon } from "lucide-react";
import ArticleCard from "./cards/ArticleCard";

const ArticleList: React.FC<ArticleListProps> = ({
  articles = [],
  loading = false,
  error = null,
  variant = "default",
  showImages = true,
  showExcerpts = true,
  onArticleClick,
  emptyMessage = "No articles found",
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoaderIcon size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorMessage message={error} type="error" />
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">{emptyMessage}</div>
        <p className="text-gray-400">
          Try adjusting your search criteria or check back later for new
          articles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <ArticleCard
          key={`${article.url}-${index}`}
          article={article}
          variant={variant}
          showImage={showImages}
          showExcerpt={showExcerpts}
          onClick={onArticleClick}
        />
      ))}
    </div>
  );
};

export default ArticleList;
