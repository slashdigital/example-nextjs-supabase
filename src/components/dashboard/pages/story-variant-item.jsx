"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import ChipRated from "./chip-complex";
import { supabaseImageStorageURL } from "@/constants/constant";
import EditIcon from "@mui/icons-material/Edit";

export default function StoryVariantItem({ storyVariant, handleEditVariant }) {
  return (
    <Paper elevation={2} sx={{ maxWidth: "100%" }}>
      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          title={storyVariant.title}
          subheader={storyVariant.description}
        />

        <CardMedia
          component="img"
          height="300"
          
          image={storyVariant.image ? `${supabaseImageStorageURL}/${storyVariant.image.file_path}/${storyVariant.image.file_name}` : ''}
          alt={storyVariant.title}
        />
        <CardContent>
          <div>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <Typography variant="overline">Complexity: </Typography>
                <br />
                <ChipRated
                  level={storyVariant.complexity}
                  label={storyVariant.complexity}
                />
              </Grid>
              <Grid item sm={6}>
                <Typography variant="overline">Low MD: </Typography>
                <br />
                <ChipRated
                  level={
                    storyVariant.low_md <= 3
                      ? "low"
                      : storyVariant.low_md <= 5
                      ? "moderate"
                      : "high"
                  }
                  label={storyVariant.low_md}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <Typography variant="overline">Uncertainty: </Typography>
                <br />
                <ChipRated
                  level={storyVariant.uncertainty}
                  label={storyVariant.uncertainty}
                />
              </Grid>
              <Grid item sm={6}>
                <Typography variant="overline">High MD: </Typography>
                <br />
                <ChipRated
                  level={
                    storyVariant.high_md <= 3
                      ? "low"
                      : storyVariant.high_md <= 5
                      ? "moderate"
                      : "high"
                  }
                  label={storyVariant.high_md}
                />
              </Grid>
            </Grid>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent="end"
            alignItems="flex-end"
          >
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => {
                handleEditVariant && handleEditVariant(storyVariant.id);
              }}
            >
              <EditIcon /> Edit
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Paper>
  );
}
