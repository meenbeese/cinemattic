import React, { useEffect, useContext, useState } from "react";
import Header from "../components/Header";
import Contextpage from "./Contextpage";
import Poster from "../components/Poster";
import COLORS from "../utilities/Color";
import {
  Container,
  Grid2,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

const Favorite = () => {
  const { loader, GetFavorite } = useContext(Contextpage);
  const [localStorageData, setLocalStorageData] = useState([]);

  useEffect(() => {
    GetFavorite();

    const data = localStorage;
    setLocalStorageData(data);
  }, []);

  return (
    <Container maxWidth="lg">
      <Header />
      <Grid2 container spacing={2} marginTop={2}>
        {loader ? (
          <CircularProgress aria-label="Loading favorites" />
        ) : (
          <>
            {Object.keys(localStorageData).filter((key) => !isNaN(key))
              .length === 0 ? (
              <Typography
                sx={{
                  fontSize: "3xl",
                  color: COLORS.White,
                  textAlign: "center",
                  width: "100%",
                  mt: "250px",
                }}
              >
                You don't have any favorites!
              </Typography>
            ) : (
              <Box display="flex" flexWrap="wrap">
                {Object.keys(localStorageData)
                  .filter((key) => !isNaN(key))
                  .map((key, index) => (
                    <Grid2
                      paddingLeft={6}
                      item
                      sx={{
                        borderRadius: 10,
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(0.93)" },
                      }}
                      key={index}
                    >
                      <Poster
                        movie={{ ...JSON.parse(localStorageData[key]) }}
                      />
                    </Grid2>
                  ))}
              </Box>
            )}
          </>
        )}
      </Grid2>
    </Container>
  );
};

export default Favorite;
