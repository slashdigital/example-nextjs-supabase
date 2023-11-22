"use client";
import { Box, Button, ImageList, Stack } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ContentTitleBar from "../content/content-title-bar";
import StoryVariantItem from "./story-variant-item";

export default function StoryItem({
  story,
  handleAddVariant,
  handleEditVariant,
  handleEditStory,
}) {
  return (
    <Grid container spacing={3}>
      <Grid item display={"flex"} sm={12} alignItems={"center"}>
        <ContentTitleBar
          color={"grey"}
          minHeight="50px"
          title={`${story.title}`}
          variant="h5"
        >
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
                handleAddVariant && handleAddVariant();
              }}
            >
              <AddIcon /> Add Story Variant
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => {
                handleEditStory && handleEditStory(story.id);
              }}
            >
              <EditIcon /> Edit Story
            </Button>
          </Stack>
        </ContentTitleBar>
      </Grid>
      <Grid item sm={12}>
        <div style={{ width: "100%" }}>
          <Grid container spacing={3}>
            {story.story_variants.map((storyVariant) => (
              <Grid item xs={6} sm={4} lg={3} key={storyVariant.id}>
                <StoryVariantItem
                  storyVariant={storyVariant}
                  handleEditVariant={handleEditVariant}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
