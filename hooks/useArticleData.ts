import { useState, useEffect, useMemo } from "react";
import { Article, UseArticleDataReturn } from "@/types";
import { useGetGuardianArticlesQuery } from "@/redux/services/guardianApi";
import { useGetTopHeadlinesQuery } from "@/redux/services/newsApi";

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
  guardianArticles && console.log(guardianArticles);
  newsApiArticles && console.log(guardianArticles);
  const [articles, setArticles] = useState<Article[]>([]);

  const mergedArticles = useMemo(() => {
    if (!newsApiArticles || !guardianArticles) return [];

    const merged = [...newsApiArticles, ...guardianArticles];

    return merged.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [newsApiArticles, guardianArticles]);

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

  useEffect(() => {
    setArticles(mergedArticles);
  }, [mergedArticles]);

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
