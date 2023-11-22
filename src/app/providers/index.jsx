"use client";

import { ThemeProvider } from "@mui/material";
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

import { SessionContextProvider } from "@supabase/auth-helpers-react";

import themes from "@/themes";
import {
  themeCustomization,
  fontCustomization,
} from "@/constants/themeCustomization";
import { useState } from "react";

export function Providers({ children }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <ThemeProvider theme={themes(fontCustomization, themeCustomization)}>
        {children}
      </ThemeProvider>
    </SessionContextProvider>
  );
}
