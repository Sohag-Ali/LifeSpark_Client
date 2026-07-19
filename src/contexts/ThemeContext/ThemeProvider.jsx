import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const STORAGE_KEY = "lifespark-theme";

const ThemeProvider = ({ children }) => {
  // The inline script in index.html already set data-theme before first
  // paint (FOUC prevention) — read it back instead of re-deciding, so
  // React's initial state matches what's already on screen.
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const themeInfo = { theme, toggleTheme, setTheme };

  return <ThemeContext value={themeInfo}>{children}</ThemeContext>;
};

export default ThemeProvider;
