"use client";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function GridItemDisplayField({
  label = "",
  content = "",
  color = "default",
}) {
  return (
    <Grid container spacing={3}>
      {/* Field title */}
      <Grid item sm={4}>
        <Typography variant="overline" display="block" fontWeight={"600"}>
          {label}
        </Typography>
      </Grid>
      {/* Field value */}
      <Grid item sm={8}>
        <Chip color={color} label={content}></Chip>
      </Grid>
    </Grid>
  );
}
