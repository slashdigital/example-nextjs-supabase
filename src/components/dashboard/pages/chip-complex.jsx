"use client";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

export default function ChipRated({ level, label }) {
  const getColor = (level) => {
    switch (level) {
      case "low":
        return "secondary";
      case "moderate":
        return "warning";
      case "high":
        return "danger";
    }
  };
  const getLevelLabel = (level) => {
    switch (level) {
      case "low":
        return "Low";
      case "moderate":
        return "Moderate";
      case "high":
        return "high";
    }
  };

  return (
    <Chip
      size="small"
      color={getColor(level)}
      sx={{borderRadius: '5px'}}
      label={
        <Typography fontWeight={"bold"}>
          {label === level ? getLevelLabel(label) : label}
        </Typography>
      }
    />
  );
}
