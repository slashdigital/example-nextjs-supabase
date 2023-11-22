"use client";
import { Button, Divider, Stack, Typography } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import AddIcon from "@mui/icons-material/Add";

import EditIcon from "@mui/icons-material/Edit";
import ContentTitleBar from "../content/content-title-bar";
import Image from "next/image";
import { supabaseImageStorageURL } from "@/constants/constant";
import StoryItem from "./story-item";

export default function EpicItem({
  epic,
  handleEditEpic,
  handleAddStory,
  handleEditStory,
  handleAddVariant,
  handleEditVariant,
}) {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item display={"flex"} sm={12} alignItems={"center"}>
          <ContentTitleBar
            color={"black"}
            title={`Wave#${epic.wave_impl}:${epic.epic_name}`}
            variant="h4"
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
                  handleAddStory && handleAddStory({ epic_id: epic.id });
                }}
              >
                <AddIcon /> Add Story to Epic
              </Button>

              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => {
                  handleEditEpic && handleEditEpic({ epic_id: epic.id });
                }}
              >
                <EditIcon /> Edit Epic
              </Button>
            </Stack>
          </ContentTitleBar>
        </Grid>
      </Grid>

      <Divider />

      <Grid container>
        <Grid item xs={11} xsOffset={1}>
          {/* <ContentTitleBar minHeight="30px" title={`Stories:`} variant="h4"></ContentTitleBar> */}

          {epic.stories.map((story) => (
            <StoryItem
              story={story}
              key={story.id}
              handleAddVariant={() =>
                handleAddVariant && handleAddVariant(story.id, epic.id)
              }
              handleEditVariant={(variant_id) =>
                handleEditVariant &&
                handleEditVariant(story.id, epic.id, variant_id)
              }
              handleEditStory={(story_id) =>
                handleEditStory && handleEditStory({ story_id })
              }
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
}
