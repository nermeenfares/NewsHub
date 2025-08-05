import { useState, useEffect, useMemo } from "react";
import { Article, UseArticleDataReturn } from "@/types";
import { useGetGuardianArticlesQuery } from "@/redux/services/guardianApi";
import { useGetTopHeadlinesQuery } from "@/redux/services/newsApi";

/**
 * Custom hook for managing article data from multiple sources
 * @returns Article data with loading states and metadata
 */
export function useArticleData(): UseArticleDataReturn {
  const {
    data: newsApiArticles,
    isLoading: loadingNewsApi,
    error: errorNewsApi,
  } = useGetTopHeadlinesQuery({ category: "technology" });

  const {
    data: guardianArticles,
    isLoading: loadingGuardian,
    error: errorGuardian,
  } = useGetGuardianArticlesQuery({ section: "technology" });

  const [articles, setArticles] = useState<Article[]>([]);

  // Merge articles from both sources
  const mergedArticles = useMemo(() => {
    if (!newsApiArticles || !guardianArticles) return [];

    const merged = [...newsApiArticles, ...guardianArticles];

    // Sort by publication date (newest first)
    return merged.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [newsApiArticles, guardianArticles]);

  // Extract unique categories and sources
  const { availableCategories, availableSources } = useMemo(() => {
    const categoriesSet = new Set<string>();
    const sourcesSet = new Set<string>();

    mergedArticles.forEach((article) => {
      const category = article.category?.trim().toLowerCase();
      const sourceName = article.source?.name?.trim();

      if (category) categoriesSet.add(category);
      if (sourceName) sourcesSet.add(sourceName);
    });

    return {
      availableCategories: Array.from(categoriesSet).sort(),
      availableSources: Array.from(sourcesSet).sort(),
    };
  }, [mergedArticles]);

  // Update articles state when merged articles change
  useEffect(() => {
    setArticles(mergedArticles);
  }, [mergedArticles]);

  // Determine loading and error states
  const loading = loadingNewsApi || loadingGuardian;
  const error =
    (errorNewsApi && "Error loading NewsAPI data") ||
    (errorGuardian && "Error loading Guardian data") ||
    null;

  return {
    articles,
    loading,
    error,
    availableCategories,
    availableSources,
  };
}
