import { useEffect, useState } from "react";

export const toggleTheme = (theme: "dark" | "light" | "system") => {
  if (theme === "light") {
    if (document.documentElement.classList.contains("dark"))
      document.documentElement.classList.remove("dark");
  } else if (theme === "dark") {
    if (!document.documentElement.classList.contains("dark"))
      document.documentElement.classList.add("dark");
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      toggleTheme("dark");
    else toggleTheme("light");
  }
};

export const useSystemTheme = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      setPrefersDarkMode(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", onChange);
    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);
  return prefersDarkMode;
};
