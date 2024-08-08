import { useContext } from "react";

// providers
import { ThemeContext, ThemeContextProps } from "@/Theme/themeProvider";

const useThemeMode = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useThemeMode;
