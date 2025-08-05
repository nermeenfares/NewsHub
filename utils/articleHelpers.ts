import { Article } from "@/types";

export function extractCategories(articles: Article[]): string[] {
  const categoriesSet = new Set<string>();

  articles.forEach((article) => {
    const category = article.category?.trim().toLowerCase();
    if (category) {
      categoriesSet.add(category);
    }
  });

  return Array.from(categoriesSet).sort();
}

export function extractSources(articles: Article[]): string[] {
  const sourcesSet = new Set<string>();

  articles.forEach((article) => {
    const sourceName = article.source?.name?.trim();
    if (sourceName) {
      sourcesSet.add(sourceName);
    }
  });

  return Array.from(sourcesSet).sort();
}

export function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;

  if (diffInHours < 1) {
    const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    const hours = Math.floor(diffInHours);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 7) {
    const days = Math.floor(diffInDays);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength).trim() + "...";
}

export function generateExcerpt(
  article: Article,
  maxLength: number = 150
): string {
  const text = article.description || article.content || "";
  return truncateText(text, maxLength);
}

export function hasValidImage(article: Article): boolean {
  return !!(
    article.urlToImage &&
    article.urlToImage.startsWith("http") &&
    !article.urlToImage.includes("placeholder")
  );
}

export function getFallbackImage(category?: string): string {
  const fallbackImages = {
    technology: "/images/tech-fallback.jpg",
    business: "/images/business-fallback.jpg",
    sports: "/images/sports-fallback.jpg",
    entertainment: "/images/entertainment-fallback.jpg",
    health: "/images/health-fallback.jpg",
    science: "/images/science-fallback.jpg",
    default: "/images/news-fallback.jpg",
  };

  return (
    fallbackImages[category?.toLowerCase() as keyof typeof fallbackImages] ||
    fallbackImages.default
  );
}

export function sanitizeArticle(article: any): Article {
  return {
    id: article.id || `${article.url}-${Date.now()}`,
    title: article.title || "Untitled",
    description: article.description || "",
    content: article.content || "",
    url: article.url || "#",
    urlToImage: hasValidImage(article)
      ? article.urlToImage
      : getFallbackImage(article.category),
    publishedAt: article.publishedAt || new Date().toISOString(),
    author: article.author || "Unknown Author",
    source: {
      id: article.source?.id || "",
      name: article.source?.name || "Unknown Source",
    },
    category: article.category || "general",
  };
}
