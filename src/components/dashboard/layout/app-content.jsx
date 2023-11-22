"use client";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import { DrawerHeader } from "./app-drawer";
import AppContentBreadcrumbs from "./app-content-breadcrumbs";

export default function AppContent({ children }) {
  const routes = [
    {
      title: "Home",
      icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
      link: "/dashboard",
    },
  ];
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <DrawerHeader />
      <AppContentBreadcrumbs routes={routes} />
      {children}
    </Box>
  );
}
