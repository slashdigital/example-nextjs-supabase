"use client";
import AppContent from "@/components/dashboard/layout/app-content";
import AppDrawer from "@/components/dashboard/layout/app-drawer";
import AppHeaderBar from "@/components/dashboard/layout/app-header-bar";
import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";

export default function AppLayout({ children, title }) {
  const [open, setOpen] = useState(true);

  const handleDrawerEvent = (currentState) => {
    setOpen(!currentState);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppHeaderBar title={title} open={open} drawerEvent={handleDrawerEvent} />
      <AppDrawer open={open}/>
      <AppContent>{children}</AppContent>
    </Box>
  );
}
