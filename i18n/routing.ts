import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/pathnames": {
      en: "/pathnames",
      ar: "/pathnames",
    },
    "/register": "/register",
    "/login": "/login",
  },
});
