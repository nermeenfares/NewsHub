"use client";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lang: "en" | "ar") => {
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  return (
    <>
      <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
        🇺🇸 English
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>
        🇪🇬 Arabic
      </DropdownMenuItem>
    </>
  );
}
export default LanguageDropdown;
