import React, { ReactNode, createContext, useEffect, useState } from "react";

export type GlobalContent = {
  theme: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<GlobalContent>({
  theme: false,
  toggleTheme: () => {},
});

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<boolean>(true);

  const toggleTheme = () => {
    setTheme((previous) => !previous);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
