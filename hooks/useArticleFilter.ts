import { useState, useEffect, useMemo, useCallback } from "react";
import { Article, SearchFilters, UseArticleFiltersReturn } from "@/types";
import { useDebounce } from "./useDebounce";

const initialFilters: SearchFilters = {
  category: "",
  source: "",
  author: "",
  dateRange: "",
  sortBy: "publishedAt",
  sortOrder: "desc",
};

export function useArticleFilters(
  articles: Article[]
): UseArticleFiltersReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredArticles = useMemo(() => {
    let filtered = [...articles];

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description?.toLowerCase().includes(query) ||
          article.author?.toLowerCase().includes(query) ||
          article.category?.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        (article) =>
          article.category &&
          selectedCategories.includes(article.category.toLowerCase())
      );
    }

    if (selectedSources.length > 0) {
      filtered = filtered.filter((article) =>
        selectedSources.includes(article.source.name)
      );
    }

    if (filters.author) {
      filtered = filtered.filter((article) =>
        article.author?.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    if (filters.dateRange) {
      const now = new Date();
      const filterDate = new Date();

      switch (filters.dateRange) {
        case "today":
          filterDate.setDate(now.getDate() - 1);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(
        (article) => new Date(article.publishedAt) >= filterDate
      );
    }

    filtered.sort((a, b) => {
      let aVal: string | Date, bVal: string | Date;

      switch (filters.sortBy) {
        case "title":
          aVal = a.title;
          bVal = b.title;
          break;
        case "source":
          aVal = a.source.name;
          bVal = b.source.name;
          break;
        default:
          aVal = new Date(a.publishedAt);
          bVal = new Date(b.publishedAt);
      }

      if (filters.sortOrder === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [
    articles,
    debouncedSearchQuery,
    selectedCategories,
    selectedSources,
    filters,
  ]);

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedSources([]);
    setFilters(initialFilters);
  }, []);

  return {
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
  };
}
