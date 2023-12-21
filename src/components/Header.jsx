import React, { useContext } from "react";
import Contextpage from "../pages/Contextpage";
import COLORS from "../utilities/Color";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import { Box, Typography, IconButton } from "@mui/material";

const Header = ({ showGenres, setShowGenres }) => {
  const { header, backgenre } = useContext(Contextpage);

  const handleToggleGenres = () => {
    setShowGenres(!showGenres);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: "20px",
        marginBottom: "20px",
        textAlign: "center",
      }}
    >
      {backgenre && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          sx={{ position: "absolute", left: "10px" }}
        >
          <ArrowBackIos />
        </IconButton>
      )}
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: "32px",
            color: COLORS.Alice_Blue,
            fontWeight: "bold",
            padding: "10px",
            background: COLORS.Mirage,
            borderRadius: "8px",
          }}
        >
          {header}
        </Typography>
        {header === "Genres" && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="toggle genres"
            onClick={handleToggleGenres}
            sx={{ color: COLORS.Alice_Blue }}
          >
            {showGenres ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Header;
