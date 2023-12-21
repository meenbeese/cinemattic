import React, { useEffect, useContext, useState } from "react";
import Contextpage from "../pages/Contextpage";
import COLORS from "../utilities/Color";
import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";

const GENRE_ROW_SIZE = 5;

const Genres = ({ showGenres }) => {
  const { fetchGenre, activegenre, setActiveGenre, genres } =
    useContext(Contextpage);

  const [randomGenre, setRandomGenre] = useState("");

  const handleRandom = () => {
    const shuffledGenres = genres?.length
      ? [...genres].sort(() => 0.5 - Math.random())
      : [];
    const random = shuffledGenres[0];
    if (random) {
      setRandomGenre(random.id);
      setActiveGenre(random.id);
    }
  };

  const splitEvery = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  useEffect(() => {
    handleRandom();
  }, []);

  return (
    <>
      {showGenres && (
        <Box borderRadius={5} sx={{ margin: "20px", textAlign: "center" }}>
          {splitEvery(genres?.length ? genres : [], GENRE_ROW_SIZE).map(
            (row, i, arr) => (
              <Box
                key={`row${i}`}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  padding: 1,
                }}
              >
                {row.map((genre) => (
                  <ToggleButton
                    onClick={() => setActiveGenre(genre.id)}
                    color={
                      activegenre === genre.id && activegenre !== randomGenre
                        ? "primary"
                        : "secondary"
                    }
                    key={genre.id}
                    value={genre.name}
                    sx={{
                      color:
                        activegenre === genre.id
                          ? COLORS.Black
                          : COLORS.Wild_Sand,
                      flexGrow: 1,
                      maxWidth: "150px",
                      bgcolor:
                        activegenre === genre.id
                          ? COLORS.Dodger_Blue
                          : COLORS.Mirage,
                      border: `2px solid ${COLORS.White}`,
                      padding: "5px",
                      borderRadius: "10px",
                      boxShadow:
                        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                      "&:hover": {
                        backgroundColor: COLORS.Cornflower_Blue,
                        borderColor: COLORS.Pigeon_Post,
                        color: COLORS.Black,
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {genre.name}
                  </ToggleButton>
                ))}
                {i === arr.length - 1 && (
                  <ToggleButton
                    onClick={handleRandom}
                    color={
                      activegenre === randomGenre ? "primary" : "secondary"
                    }
                    key="random"
                    value="RANDOM"
                    sx={{
                      color:
                        activegenre === randomGenre
                          ? COLORS.Black
                          : COLORS.Wild_Sand,
                      flexGrow: 1,
                      maxWidth: "150px",
                      bgcolor:
                        activegenre === randomGenre
                          ? COLORS.Gold
                          : COLORS.Mirage,
                      border: `2px solid ${COLORS.White}`,
                      padding: "5px",
                      borderRadius: "10px",
                      boxShadow:
                        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                      "&:hover": {
                        backgroundColor: COLORS.Gold,
                        borderColor: COLORS.Golden_Grass,
                        color: COLORS.Black,
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    RANDOM
                  </ToggleButton>
                )}
              </Box>
            ),
          )}
        </Box>
      )}
    </>
  );
};

export default Genres;
