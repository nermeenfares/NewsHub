import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "../next-intl.config";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
