import React, { useEffect, useContext } from "react";
import Contextpage from "../pages/Contextpage";
import Poster from "./Poster";
import Genres from "./Genres";
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Grid, CircularProgress, Box } from "@mui/material";

const Movies = () => {
  const {
    movies,
    page,
    setPage,
    totalPage,
    setMovies,
    activegenre,
    filteredGenre,
  } = useContext(Contextpage);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(0);
  }, [activegenre]);

  useEffect(() => {
    if (page > 0) {
      filteredGenre();
    }
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Header />
      <Genres />
      <Grid container spacing={2}>
        <InfiniteScroll
          dataLength={movies.length}
          next={() => setPage(page + 1)}
          hasMore={page < totalPage}
          loader={<CircularProgress aria-label="Loading more movies" />}
        >
          <Box display="flex" flexWrap="wrap">
            {movies.map((movie) => (
              <Grid
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
              </Grid>
            ))}
          </Box>
        </InfiniteScroll>
      </Grid>
    </Container>
  );
};

export default Movies;
