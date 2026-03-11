import { useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "clintrust.theme";

function applyThemeToDom(theme: ThemeMode) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    const initial: ThemeMode = saved ?? (prefersDark ? "dark" : "light");

    setTheme(initial);
    applyThemeToDom(initial);
  }, []);

  const api = useMemo(
    () => ({
      theme,
      setTheme: (next: ThemeMode) => {
        setTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
        applyThemeToDom(next);
      },
      toggle: () => {
        const next: ThemeMode = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
        applyThemeToDom(next);
      },
    }),
    [theme]
  );

  return api;
}
