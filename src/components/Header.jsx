import React, { useContext, useState } from "react";
import Contextpage from "../pages/Contextpage";
import COLORS from "../utilities/Color";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { header, backgenre, genres, activegenre, setActiveGenre } =
    useContext(Contextpage);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (id) => {
    setActiveGenre((prevActiveGenre) => {
      if (id !== prevActiveGenre) {
        handleClose();
        return id;
      }
      return prevActiveGenre;
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          width: "100%",
          overflow: "hidden",
          alignContent: "center",
          borderColor: COLORS.Mirage,
          borderRadius: "15px",
          marginTop: "20px",
        }}
      >
        {backgenre ? (
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIos />
          </IconButton>
        ) : null}
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="h4"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              alignContent: "center",
              background: COLORS.Mirage,
              fontSize: "32px",
              color: COLORS.Alice_Blue,
              fontWeight: "bold",
              padding: "10px",
              width: "100%",
            }}
          >
            {header}
          </Typography>
          <Menu
            id="genre-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ width: "200px" }}
          >
            {genres.map((genre) => (
              <MenuItem
                key={genre.id}
                selected={genre.id === activegenre}
                onClick={() => handleSelect(genre.id)}
              >
                {genre.name}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </AppBar>
    </Box>
  );
};

export default Header;
