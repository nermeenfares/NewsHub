import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article } from "@/types";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", process.env.NEXT_PUBLIC_NEWSAPI_KEY!);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<Article[], { category?: string }>({
      query: ({ category }) => {
        const url = `top-headlines?country=us&pageSize=20${
          category ? `&category=${category}` : ""
        }`;
        return url;
      },
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
