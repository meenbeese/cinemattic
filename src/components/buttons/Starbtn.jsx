import React, { useState, useEffect } from "react";
import COLORS from "../../utilities/Color";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Star, StarBorder } from "@mui/icons-material";

const AUTO_HIDE_DURATION = 5000;

const getFavoriteFromLocalStorage = (id) => {
  return localStorage.getItem(id);
};

const addFavoriteToLocalStorage = (id, movie) => {
  localStorage.setItem(id, JSON.stringify(movie));
};

const removeFavoriteFromLocalStorage = (id) => {
  localStorage.removeItem(id);
};

export const Starbtn = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const FavoriteMovie = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      if (newIsFavorite) {
        setMessage(`Added ${movie.title} to your favorites.`);
        addFavoriteToLocalStorage(movie.id, movie);
      } else {
        setMessage(`Removed ${movie.title} from your favorites.`);
        removeFavoriteFromLocalStorage(movie.id);
      }
      setOpen(true);
      return newIsFavorite;
    });
  };

  useEffect(() => {
    if (getFavoriteFromLocalStorage(movie.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [movie.id]);

  const handleClose = (reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        id={`Star-${movie.title}`}
        title="Favorite a movie"
        sx={{
          ml: 10,
          mt: 31,
          zIndex: 20,
          color: isFavorite ? COLORS.Yellow : COLORS.White,
          backgroundColor: COLORS.Black,
          borderRadius: "50%",
          fontSize: "lg",
          position: "absolute",
          "&:hover": {
            backgroundColor: COLORS.Black,
          },
        }}
        onClick={FavoriteMovie}
      >
        {isFavorite ? <Star /> : <StarBorder />}
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        disableWindowBlurListener
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};
