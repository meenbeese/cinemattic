import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button } from "@mui/material";

export const Playbtn = ({ video }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 5,
        gap: 5,
        flexWrap: "wrap",
      }}
    >
      {Array.from(video)
        .filter((trail) => trail.type === "Trailer")
        .map((trail, index) => (
          <Button
            key={trail.id}
            variant="outlined"
            color="primary"
            startIcon={<PlayArrowIcon sx={{ fontSize: "2rem" }} />}
            sx={{ fontSize: "xl", fontWeight: "semibold" }}
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${trail.key}`,
                "_blank",
              )
            }
          >
            Watch Trailer{" "}
            {Array.from(video).filter((trail) => trail.type === "Trailer")
              .length > 1
              ? index + 1
              : ""}
          </Button>
        ))}
    </Box>
  );
};
