export const port = process.env.PORT || 3000;

const config = {
  apiUrl:
    process.env.NEXT_PUBLIC_BASE_URL || "https://internal.s-echo.com:1880/",

  host: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://localhost:${port}`,
};

export default config;
