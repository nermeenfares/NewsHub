// File: src/store/guardianApi.ts (or wherever you have it)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article } from "@/types";

export const guardianApi = createApi({
  reducerPath: "guardianApi",
  // 1. Point to your own backend's API routes
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // This is the crucial change
  }),
  endpoints: (builder) => ({
    getGuardianArticles: builder.query<Article[], { section?: string }>({
      // 2. The query now builds the URL to your proxy endpoint
      query: ({ section }) => ({
        url: "/guardian", // This hits /api/guardian
        params: { section }, // RTK will append this as ?section=...
      }),
      // 3. The transformResponse remains the same, as the data structure from the proxy is identical
      transformResponse: (response: any) => {
        return response.response.results.map((item: any) => ({
          title: item.webTitle,
          description: item.fields?.trailText || "",
          content: item.fields?.bodyText || "",
          urlToImage: item.fields?.thumbnail,
          publishedAt: item.webPublicationDate,
          source: {
            name: "The Guardian",
            id: "guardian",
          },
          author: item.fields?.byline || "Unknown",
          url: item.webUrl,
          category: item.sectionName || "General",
          // Use sectionName for better category
        }));
      },
    }),
  }),
});

export const { useGetGuardianArticlesQuery } = guardianApi;
