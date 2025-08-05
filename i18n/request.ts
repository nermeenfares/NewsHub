import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { locales } from "@/next-intl.config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && locales.includes(requested as (typeof locales)[number])
      ? requested
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
