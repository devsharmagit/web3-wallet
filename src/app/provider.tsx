import { ThemeProvider } from "@/components/theme-provider";
import { AppContextProvider } from "@/context/appContext";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </ThemeProvider>
    </>
  );
};
