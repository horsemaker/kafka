import {
  useState,
  useEffect,
  useLayoutEffect,
  createContext,
  useContext,
} from "react";
import { KAFKA_THEME } from "../constants";

const ThemeContext = createContext();

const preferColorSchemeQuery = "(prefers-color-scheme: dark)";

const giveInitialTheme = () =>
  localStorage.getItem(KAFKA_THEME) ||
  (matchMedia(preferColorSchemeQuery).matches ? "dark" : "light");

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(giveInitialTheme);

  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  useEffect(() => {
    const mediaQuery = matchMedia(preferColorSchemeQuery);
    const handleColorSchemeChange = () =>
      setTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleColorSchemeChange);

    return () =>
      mediaQuery.removeEventListener("change", handleColorSchemeChange);
  }, []);

  useLayoutEffect(() => {
    localStorage.setItem(KAFKA_THEME, theme);
    if (theme === "light") {
      document.documentElement.classList.remove("dark-theme");
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark-theme");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeProvider, useTheme };
