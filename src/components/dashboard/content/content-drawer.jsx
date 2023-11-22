"use client";
import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { DrawerHeader } from "../layout/app-drawer";
import {
  Button,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import Divider from "@mui/material/Divider";
import ContentTitleBar from "./content-title-bar";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = "700px";

export default function ContentDrawer({
  open,
  children,
  title,
  actions,
  onCloseClick,
}) {
  return (
    <Drawer anchor="right" open={open}>
      <CardContent sx={{ width: drawerWidth, pl: 0, pr: 0 }}>
        <DrawerHeader />
        <ContentTitleBar title={title} padding="24px">
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent="end"
            alignItems="flex-end"
          >
            <Button size="small" onClick={() => onCloseClick()}>
              <CloseIcon />
            </Button>
          </Stack>
        </ContentTitleBar>

        <Divider />
        <Box sx={{ pl: "24px", pr: "24px", pt: "24px" }}>{children}</Box>
      </CardContent>
      <Divider />
      <CardActions>{actions}</CardActions>
    </Drawer>
  );
}
