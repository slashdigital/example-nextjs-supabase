"use client";

// import Link from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function AppContentBreadcrumbs({ routes }) {
  return (
    <Box sx={{ pl: 1, pr: 1, pt: 1, pb: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {routes.map((route, index) =>
          index != routes.length - 1 ? (
            <Link
              key={route.title}
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href={route.link}
            >
              {route.icon}
              {route.title}
            </Link>
          ) : (
            <Typography
              key={route.title}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {route.icon}
              {route.title}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
}
