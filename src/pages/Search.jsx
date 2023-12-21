import React, { useEffect, useContext } from "react";
import Contextpage from "./Contextpage";
import Poster from "../components/Poster";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import COLORS from "../utilities/Color";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { Container, Grid2, CircularProgress, Box } from "@mui/material";

const Search = () => {
  const { searchedMovies, loader, fetchSearch } = useContext(Contextpage);
  const { query } = useParams();

  useEffect(() => {
    fetchSearch(query);
  }, [query]);

  return (
    <Container maxWidth="lg">
      <Link
        to="/"
        sx={{
          position: "fixed",
          zIndex: 10,
          fontSize: "4xl",
          color: COLORS.Black,
          bgcolor: COLORS.White,
          m: 3,
          md: 5,
          borderRadius: "50%",
        }}
      >
        <ArrowBackIos />
      </Link>
      <Header />
      <Grid2 container spacing={2} marginTop={2}>
        {loader ? (
          <CircularProgress aria-label="Loading search results" />
        ) : (
          <Box display="flex" flexWrap="wrap">
            {searchedMovies.map((movie) => (
              <Grid2
                paddingLeft={6}
                item
                sx={{
                  borderRadius: 10,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(0.93)" },
                }}
                key={movie.id}
              >
                <Poster movie={movie} />
              </Grid2>
            ))}
          </Box>
        )}
      </Grid2>
    </Container>
  );
};

export default Search;
