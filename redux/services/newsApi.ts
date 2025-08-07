import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article } from "@/types";

export const newsApi = createApi({
  reducerPath: "newsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),

  endpoints: (builder) => ({
    getTopHeadlines: builder.query<Article[], { category?: string }>({
      query: ({ category }) => ({
        url: "/newsapi",
        params: { category },
      }),
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
