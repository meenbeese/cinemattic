import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import noimage from "../assets/no-img.jpg";
import formatTitle from "../utilities/Title";
import COLORS from "../utilities/Color";
import { Starbtn } from "./buttons/Starbtn";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
} from "@mui/material";

const MAX_TITLE_LENGTH = 14;

const formatVoteAverage = (voteAverage) => {
  if (voteAverage === 10.0) {
    return "10";
  }
  return voteAverage.toFixed(1);
};

const Poster = ({ movie }) => {
  const formattedTitle = useMemo(
    () => formatTitle(movie.title || movie.name),
    [movie.title, movie.name],
  );
  const movieTitle =
    formattedTitle.length > MAX_TITLE_LENGTH
      ? `${formattedTitle.slice(0, MAX_TITLE_LENGTH)}...`
      : formattedTitle;

  return (
    <Box
      sx={{
        m: 2,
        width: 200,
        height: 300,
        borderRadius: "15px",
        overflow: "hidden",
        cursor: "pointer",
        scale: 1.05,
        transition: { duration: 0.3 },
        boxShadow: 3,
        bgcolor: COLORS.Mirage,
        border: `1px solid ${COLORS.Alice_Blue}`,
      }}
    >
      <Starbtn movie={movie} />
      <Link
        to={`/moviedetail/${movie.id}`}
        sx={{
          textDecoration: "none",
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: 10,
        }}
        aria-label="See comprehensive details about the selected movie."
      >
        <Card sx={{ width: "100%", height: "100%" }}>
          <CardContent
            sx={{
              height: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 20,
              backgroundColor: "rgba(0,0,0,0.8)",
              borderBottom: `1px solid ${COLORS.Alice_Blue}`,
            }}
          >
            <Typography
              sx={{
                textDecoration: "none",
                letterSpacing: "1px",
                fontSize: "2xl",
                fontWeight: "bold",
                color: COLORS.Alice_Blue,
                wordBreak: "break-word",
              }}
              noWrap
            >
              {movieTitle}
            </Typography>
            <Typography
              sx={{
                p: 1,
                mr: 4,
                backgroundColor: () =>
                  (movie.vote_average || 0) > 7
                    ? COLORS.Celery
                    : (movie.vote_average || 0) > 5
                      ? COLORS.Mustard
                      : COLORS.Apricot,
                borderRadius: "50%",
                fontWeight: "bold",
              }}
            >
              {formatVoteAverage(movie.vote_average || 0)}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="100%"
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : noimage
            }
            alt={movie.title}
            loading="lazy"
            sx={{
              filter: "blur(5px)",
              "&.loaded": {
                filter: "blur(0)",
                transition: "filter 0.3s",
              },
            }}
            onLoad={(e) => e.target.classList.add("loaded")}
            fallback={
              <Skeleton variant="rectangular" width="100%" height="100%" />
            }
          />
        </Card>
      </Link>
    </Box>
  );
};

export default Poster;
