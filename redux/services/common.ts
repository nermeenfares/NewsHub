import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import config from "@/config";

const baseUrl = config.apiUrl;

// Public endpoints that don't require authentication
const PUBLIC_ENDPOINTS = ["login", "register"];

type RequestArgs =
  | string
  | {
      url: string;
      method?: string;
      body?: unknown;
    };

export const baseQuery = async (
  args: RequestArgs,
  api: any,
  extraOptions: Record<string, unknown>
) => {
  const state: RootState = api.getState();
  const accessToken = state?.auth?.data.accessToken;

  // Check if request is to a public endpoint
  const isPublicRequest = PUBLIC_ENDPOINTS.some((endpoint) =>
    typeof args === "string"
      ? args.startsWith(endpoint)
      : args.url.startsWith(endpoint)
  );

  // If public, proceed without token
  if (isPublicRequest) {
    return fetchBaseQuery({ baseUrl })(args, api, extraOptions);
  }

  // Prepare headers
  const baseQuery = fetchBaseQuery({
    baseUrl,

    prepareHeaders: (headers) => {
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      // Set content type if not FormData
      if (args && typeof args === "object" && args.body) {
        const isFormData =
          typeof FormData !== "undefined" && args.body instanceof FormData;
        if (!isFormData) {
          headers.set("Content-Type", "application/json");
        } else {
          headers.delete("Content-Type");
        }
      }
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  // If token invalid or expired, logout
  if (!accessToken) {
    api.dispatch(logout());
    // window.location.href = "/login";
  }

  return result;
};
