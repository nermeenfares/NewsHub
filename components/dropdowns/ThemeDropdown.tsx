"use client";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sun, Moon } from "lucide-react";

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <Sun className="mr-2 h-4 w-4" />
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Moon className="mr-2 h-4 w-4" />
        Dark
      </DropdownMenuItem>
    </>
  );
}
