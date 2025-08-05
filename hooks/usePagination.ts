import { useState, useMemo, useCallback } from "react";
import { Article, UsePaginationReturn } from "@/types";

export function usePagination(
  items: Article[],
  itemsPerPage: number = 12
): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const currentItems = useMemo(() => {
    return items.slice(offset, offset + itemsPerPage);
  }, [items, offset, itemsPerPage]);

  const handlePageChange = useCallback((selected: { selected: number }) => {
    setCurrentPage(selected.selected);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useMemo(() => {
    setCurrentPage(0);
  }, [items.length]);

  return {
    currentPage,
    pageCount,
    currentItems,
    handlePageChange,
    itemsPerPage,
  };
}
