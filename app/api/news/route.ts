// File: src/store/newsApi.ts (or wherever you have it)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article } from "@/types";

export const newsApi = createApi({
  reducerPath: "newsApi",
  // 1. Point to your own backend's API routes
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // This is the crucial change
  }),
  // REMOVED: No need for prepareHeaders to set the Authorization token anymore!
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<Article[], { category?: string }>({
      // 2. The query now builds the URL to your proxy endpoint
      query: ({ category }) => ({
        url: "/newsapi", // This hits /api/newsapi
        params: { category }, // RTK will append this as ?category=...
      }),
      // 3. The transformResponse remains the same
      transformResponse: (response: any) => {
        return response.articles.map((article: any) => ({
          ...article,
          category: article.category || "General",
          source: {
            name: article.source.name,
            id: article.source.id || "newsapi",
          },
        }));
      },
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
