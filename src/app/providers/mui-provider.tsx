"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import theme from "@/styles/theme";

interface MuiProviderProps {
  children: React.ReactNode;
}

export default function MuiProvider({ children }: MuiProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
