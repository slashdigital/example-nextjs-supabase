'use client';

import { Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

const MinimalHeader = ({ title }) => {
  
  const theme = useTheme();
  return (
    <>
      <Container sx={{ padding: theme.extra.padding.title }}>
        <Grid container spacing={3}>
          <Grid xsOffset={4} xs={4} sx={{ textAlign: "center" }}>
            <Typography variant="h3">
              { title }
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MinimalHeader;
