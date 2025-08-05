import React from "react";
import { Clock, ExternalLink, User, Tag } from "lucide-react";

interface Article {
  title: string;
  description?: string;
  urlToImage?: string;
  publishedAt?: string;
  source?: { name?: string };
  author?: string;
  url: string;
  category?: string;
}

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
  showImage?: boolean;
  showExcerpt?: boolean;
  onClick?: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = "default",
  showImage = true,
  showExcerpt = true,
  onClick,
}) => {
  const {
    title,
    description,
    urlToImage,
    publishedAt,
    source,
    author,
    url,
    category,
  } = article;

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(article);
    } else {
      window.open(url, "_blank");
    }
  };

  const cardClasses = {
    default:
      "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer",
    featured:
      "bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer border-l-4 border-blue-500",
    compact:
      "bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer",
  };

  return (
    <article className={cardClasses[variant]} onClick={handleCardClick}>
      {showImage && urlToImage && (
        <div className="relative">
          <img
            src={urlToImage}
            alt={title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {category && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
              {category}
            </span>
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {source?.name && (
              <span className="font-medium text-blue-600">{source.name}</span>
            )}
            {author && (
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{author}</span>
              </div>
            )}
          </div>
          {publishedAt && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(publishedAt)}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {showExcerpt && description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between">
          {category && !urlToImage && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Tag className="h-3 w-3" />
              <span>{category}</span>
            </div>
          )}
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors ml-auto">
            <span>Read more</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
