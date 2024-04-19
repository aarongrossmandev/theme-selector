"use client";

import { DropdownProvider } from "@/contexts/useDropdown";
import { cn } from "@/lib/utils";
import { Moon, Paintbrush, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import {
  DropdownContent,
  DropdownHeader,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
} from "./ui/Dropdown";

type ThemeType = {
  light: { name: string; color: string }[];
  dark: { name: string; color: string }[];
};

const themes: ThemeType = {
  light: [
    { name: "zinc", color: "bg-zinc-100" },
    { name: "orange", color: "bg-orange-500" },
    { name: "red", color: "bg-red-500" },
    { name: "blue", color: "bg-blue-500" },
    { name: "green", color: "bg-green-500" },
  ],
  dark: [
    { name: "zinc", color: "bg-zinc-950" },
    { name: "orange", color: "bg-orange-500" },
    { name: "red", color: "bg-red-500" },
    { name: "blue", color: "bg-blue-500" },
    { name: "green", color: "bg-green-500" },
  ],
};

export default function ThemeSwitch() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") || "light";
    }
    return "";
  });
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const handleModeChange = (newMode: "light" | "dark") => {
    const selectedTheme = theme?.split("-")[1];
    const newTheme = `${newMode}-${selectedTheme}`;
    setMode(newMode);
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <DropdownProvider>
      <DropdownTrigger>
        <Paintbrush className="text-accent" />
      </DropdownTrigger>
      <DropdownContent side="right" sideOffSet={30}>
        <DropdownHeader>Customize Theme</DropdownHeader>
        <DropdownLabel>Mode</DropdownLabel>
        <DropdownItem>
          <button
            className={cn(
              "flex items-center gap-x-2 py-1 px-3 rounded-md text-sm border border-muted hover:bg-background transition",
              mode === "light" && "border-2 border-border"
            )}
            onClick={() => handleModeChange("light")}
          >
            <Sun className="w-5 h-5 shrink-0" />
            Light
          </button>
          <button
            className={cn(
              "flex items-center gap-x-2 py-1 px-3 rounded-md text-sm border border-muted hover:bg-background transition",
              mode === "dark" && "border-2 border-border"
            )}
            onClick={() => handleModeChange("dark")}
          >
            <Moon className="w-5 h-5 shrink-0" />
            Dark
          </button>
        </DropdownItem>
        <DropdownLabel>Colors</DropdownLabel>
        <DropdownItem>
          {themes[mode as keyof ThemeType]?.map((themeOption) => (
            <button
              key={themeOption.name}
              onClick={() => setTheme(mode + "-" + themeOption.name)}
              className={cn(
                "flex items-center gap-x-2 border border-muted py-1 px-2 rounded-md text-sm text-foreground hover:bg-background transition ease-in",

                theme === mode + "-" + themeOption.name &&
                  "border-2 border-border"
              )}
            >
              <div
                className={`w-4 h-4 rounded-full border shrink-0 ${themeOption.color}`}
              />
              {themeOption.name}
            </button>
          ))}
        </DropdownItem>
      </DropdownContent>
    </DropdownProvider>
  );
}
