import { ThemeProvider } from "@/components/theme-provider"
import React from "react"


export const Providers = ({children}: {children: React.ReactNode})=>{
    return <>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark">
        {children}
    </ThemeProvider>
    </>
}

 