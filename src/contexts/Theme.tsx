import React, { ReactNode, createContext, useState } from "react";

export type GlobalContent = {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<GlobalContent>({
  theme: false, // set a default value
  setTheme: () => {},
});

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<boolean>(false);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
