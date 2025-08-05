import { getRequestConfig } from "next-intl/server";
import { locales } from "./next-intl.config";
import { notFound } from "next/navigation";
// Removed unused or undefined RequestLocale call
import { setRequestLocale } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) notFound();

  setRequestLocale(locale);

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
