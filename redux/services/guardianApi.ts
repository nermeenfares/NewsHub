import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article } from "@/types";

export const guardianApi = createApi({
  reducerPath: "guardianApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getGuardianArticles: builder.query<Article[], { section?: string }>({
      query: ({ section }) => ({
        url: "/guardian",
        params: { section },
      }),

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
        }));
      },
    }),
  }),
});

export const { useGetGuardianArticlesQuery } = guardianApi;
