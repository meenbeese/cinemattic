import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Contextpage from "../pages/Contextpage";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import noimage from "../assets/movies.jpg";
import InfoIcon from "@mui/icons-material/Info";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import MONTHS from "../utilities/Month";
import SECRET from "../utilities/Secret";
import COLORS from "../utilities/Color";
import { Playbtn } from "./buttons/Playbtn";
import {
  Box,
  Chip,
  Grid2,
  IconButton,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";

export const Details = () => {
  const { loader, setLoader } = useContext(Contextpage);
  const { id } = useParams();

  const [moviedet, setMoviedet] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${SECRET.API_KEY}&language=en-US`,
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
    setMoviegenres(moviedetail.genres);
    setLoader(false);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${SECRET.API_KEY}&language`,
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    setLoader(false);
  };

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${SECRET.API_KEY}&language=en-US`,
    );
    const videodata = await data.json();
    setVideo(videodata.results);
  };

  const apiDate = moviedet.release_date;
  let formattedDate = apiDate;

  if (apiDate) {
    const dateParts = apiDate.split("-");
    const year = dateParts[0];
    const month = MONTHS.get(parseInt(dateParts[1]));
    const day = dateParts[2];
    formattedDate = `${month} ${day}, ${year}`;
  }

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  return (
    <>
      {loader ? (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="loader m-10"></span>
        </Box>
      ) : (
        <>
          <Link
            to="/"
            style={{
              position: "absolute",
              zIndex: 10,
              fontSize: "24px",
              color: COLORS.White,
              backgroundColor: COLORS.Black,
              margin: "25px",
              padding: "10px",
              borderRadius: "75%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowBackIos />
          </Link>
          {/* poster and title */}
          <Box
            sx={{
              position: "relative",
              height: "60dvh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                boxShadow: "inset 0 0 200px 50px rgba(0,0,0,0.8)",
                position: "absolute",
              }}
            ></Box>
            <Typography
              sx={{
                position: "absolute",
                bottom: -65,
                padding: "65px",
                fontSize: "45px",
                fontWeight: "bold",
                textAlign: "center",
                color: COLORS.White,
              }}
            >
              {moviedet.title}
            </Typography>
            <img
              src={
                moviedet.backdrop_path
                  ? "https://image.tmdb.org/t/p/original/" +
                    moviedet.backdrop_path
                  : noimage
              }
              alt={moviedet.title}
              style={{
                height: "100%",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
          {/* overview and release date */}
          <Stack direction="column" alignItems="center" spacing={4}>
            <Typography
              sx={{
                color: COLORS.White,
                textAlign: "center",
                paddingTop: "20px",
                paddingX: "25px",
                fontSize: "18px",
                fontFamily: "Arial",
                lineHeight: "1.6",
                maxWidth: "60%",
                margin: "auto",
              }}
            >
              {moviedet.overview}
            </Typography>
            <Chip
              label={`Release Date: ${formattedDate}`}
              sx={{
                textAlign: "center",
                color: COLORS.White,
                fontFamily: "Arial",
                fontSize: "22px",
                backgroundColor: COLORS.Mine_Shaft,
                padding: "10px",
                borderRadius: "30px",
              }}
            />
          </Stack>
          {/* genres */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            {moviegenres.map((tag) => (
              <Chip
                label={tag.name}
                key={tag.id}
                sx={{
                  margin: "10px",
                  backgroundColor: COLORS.Emperor,
                  fontFamily: "Arial",
                  fontSize: "18px",
                  color: COLORS.White,
                }}
              />
            ))}
          </Box>
          {/* trailer */}
          <Playbtn video={video}></Playbtn>
          {/* cast */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              paddingBottom: "20px",
            }}
          >
            <Typography
              variant="h4"
              color="primary"
              fontWeight="bold"
              sx={{ padding: "10px" }}
            >
              Cast
            </Typography>
            <Grid2 container spacing={2} justifyContent="center">
              {castdata.map(
                (cast) =>
                  cast.profile_path && (
                    <Grid2 item xs={6} sm={4} md={2} lg={1.5} key={cast.id}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "15px",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <LazyLoadImage
                          effect="blur"
                          src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                          alt={cast.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 175,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundImage:
                              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                          }}
                        />
                        <ImageListItemBar
                          title={cast.name}
                          subtitle={cast.character}
                          sx={{
                            backgroundColor: "transparent",
                            color: COLORS.White,
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            "& .MuiImageListItemBar-titleWrap": {
                              alignItems: "flex-start",
                              padding: "10px",
                            },
                            "& .MuiImageListItemBar-title": {
                              fontSize: "18px",
                              fontWeight: "bold",
                            },
                            "& .MuiImageListItemBar-subtitle": {
                              fontSize: "14px",
                              fontStyle: "italic",
                            },
                          }}
                          actionIcon={
                            <IconButton
                              sx={{
                                color: COLORS.White,
                                marginTop: "10px",
                                marginRight: "-10px",
                              }}
                              aria-label={`info about ${cast.name}`}
                            >
                              <InfoIcon />
                            </IconButton>
                          }
                          actionPosition="left"
                        />
                      </Box>
                    </Grid2>
                  ),
              )}
            </Grid2>
          </Box>
        </>
      )}
    </>
  );
};
