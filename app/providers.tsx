"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider enableSystem defaultTheme="system" attribute="class">
      {children}
    </ThemeProvider>
  );
}
