export interface Article {
  id: string;
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  author?: string;
  source: {
    id?: string;
    name: string;
  };
  category?: string;
}

export interface SearchFilters {
  category: string;
  source: string;
  author: string;
  dateRange: string;
  sortBy: "publishedAt" | "title" | "source";
  sortOrder: "asc" | "desc";
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface GuardianApiResponse {
  response: {
    status: string;
    total: number;
    results: Article[];
  };
}

export interface ArticleGridProps {
  articles: Article[];
  columns?: number;
  onArticleClick: (article: Article) => void;
  loading?: boolean;
  error?: string | null;
}

export interface ArticleListProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  loading?: boolean;
  error?: string | null;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
  recentSearches?: string[];
  showFilters?: boolean;
}

export interface FilterDropdownProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
  availableCategories: string[];
  availableSources: string[];
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  maxVisible?: number;
}

export interface SourceFilterProps {
  sources: string[];
  selectedSources: string[];
  onSourceChange: (sources: string[]) => void;
  maxVisible?: number;
  showSearch?: boolean;
}

export interface UseArticleDataReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
  availableCategories: string[];
  availableSources: string[];
}

export interface UseArticleFiltersReturn {
  filteredArticles: Article[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedSources: string[];
  setSelectedSources: (sources: string[]) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  clearAllFilters: () => void;
}

export interface UsePaginationReturn {
  currentPage: number;
  pageCount: number;
  currentItems: Article[];
  handlePageChange: (selected: { selected: number }) => void;
  itemsPerPage: number;
}

export type ViewMode = "grid" | "list";

export interface ShareData {
  title: string;
  description: string;
  url: string;
}
