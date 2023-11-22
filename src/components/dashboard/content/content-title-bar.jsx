"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function ContentTitleBar({
  children,
  title,
  padding = "0px",
  variant = "h3",
  minHeight = "60px",
  color = 'primary'
}) {
  return (
    <Box
      sx={{ minHeight, display: "flex", pl: padding, pr: padding }}
      flex={1}
      justifyItems={"center"}
      alignItems={"center"}
    >
      <Grid container flex={1} alignItems={'center'}>
        <Grid item xs={6}>
          <Typography color={color} variant={variant} fontWeight={"600"}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}
