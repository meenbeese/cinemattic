import React, { useEffect, useContext } from "react";
import Contextpage from "./Contextpage";
import Poster from "../components/Poster";
import Header from "../components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Grid2, CircularProgress, Box } from "@mui/material";

const Upcoming = () => {
  const { setPage, page, fetchUpcoming, upcoming, totalPage } =
    useContext(Contextpage);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchUpcoming();
    }
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Header />
      <Grid2 container spacing={2} marginTop={2}>
        <InfiniteScroll
          dataLength={upcoming.length}
          next={() => setPage(page + 1)}
          hasMore={page < totalPage}
          loader={<CircularProgress aria-label="Loading more movies" />}
        >
          <Box display="flex" flexWrap="wrap">
            {upcoming.map((upc) => (
              <Grid2
                paddingLeft={6}
                item
                sx={{
                  borderRadius: 10,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(0.93)" },
                }}
                key={upc.id}
              >
                <Poster movie={upc} />
              </Grid2>
            ))}
          </Box>
        </InfiniteScroll>
      </Grid2>
    </Container>
  );
};

export default Upcoming;
