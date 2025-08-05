import React from "react";
import {
  Clock,
  ExternalLink,
  User,
  Tag,
  ArrowLeft,
  Share2,
} from "lucide-react";

const ArticleDetails = ({ article, onBack, onShare }) => {
  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Article not found</p>
      </div>
    );
  }

  const {
    title,
    description,
    content,
    urlToImage,
    publishedAt,
    source,
    author,
    url,
    category,
  } = article;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = () => {
    if (onShare) {
      onShare(article);
    } else if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: url,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
          )}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>Read Original</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {category && (
          <div className="flex items-center space-x-1 text-blue-600 mb-3">
            <Tag className="h-4 w-4" />
            <span className="text-sm font-medium">{category}</span>
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {source?.name && (
            <span className="font-medium text-blue-600">{source.name}</span>
          )}
          {author && (
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>By {author}</span>
            </div>
          )}
          {publishedAt && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(publishedAt)}</span>
            </div>
          )}
        </div>
      </div>

      {urlToImage && (
        <div className="relative">
          <img
            src={urlToImage}
            alt={title}
            className="w-full h-64 md:h-96 object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="p-6">
        {description && (
          <div className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
            {description}
          </div>
        )}

        {content && (
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-line">
              {content.replace(/\[.*?\]/g, "")} {/* Remove source references */}
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-3">
            This is a summary. Read the full article for complete details.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Read Full Article</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetails;
