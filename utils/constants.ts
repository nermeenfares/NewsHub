export const ITEMS_PER_PAGE = 12;
export const MAX_VISIBLE_FILTERS = 6;

export const SEARCH_DEBOUNCE_DELAY = 300;
export const MAX_RECENT_SEARCHES = 5;

export const ANIMATION_DURATION = 0.6;
export const ANIMATION_STAGGER = 0.1;

export const DATE_RANGE_OPTIONS = [
  { value: "", label: "All time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
];

export const SORT_OPTIONS = [
  { value: "publishedAt", label: "Publication Date" },
  { value: "title", label: "Title" },
  { value: "source", label: "Source" },
];

export const SORT_ORDER_OPTIONS = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

export const DEFAULT_RECENT_SEARCHES = [
  "climate change",
  "technology news",
  "stock market",
];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const GRID_COLUMNS = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  large: 4,
};

export const SKELETON_COUNTS = {
  grid: 12,
  list: 8,
  filters: 5,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  API_ERROR: "Failed to fetch articles. Please try again.",
  NO_RESULTS: "No articles found matching your criteria.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
};

export const SUCCESS_MESSAGES = {
  ARTICLE_SHARED: "Article shared successfully!",
  FILTERS_CLEARED: "All filters cleared.",
  SEARCH_SAVED: "Search saved to recent searches.",
};

export const STORAGE_KEYS = {
  RECENT_SEARCHES: "news-app-recent-searches",
  VIEW_MODE: "news-app-view-mode",
  FILTERS: "news-app-filters",
  THEME: "news-app-theme",
};
