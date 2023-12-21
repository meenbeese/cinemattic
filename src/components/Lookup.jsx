import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "../utilities/Slugify";
import COLORS from "../utilities/Color";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, TextField, InputAdornment, IconButton } from "@mui/material";

const Searchbar = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = value.trim();
    if (query !== "") {
      try {
        navigate(`/search/${slugify(query)}`);
      } catch (error) {
        console.error(error);
        setError("An error occurred while searching. Please try again.");
      }
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSearch}>
        <TextField
          type="search"
          variant="outlined"
          size="medium"
          placeholder="Search movie titles..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton type="submit" color="primary" aria-label="Search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{
            bgcolor: COLORS.White,
            width: "300px",
            borderRadius: "25px",
            "& fieldset": {
              border: "none",
            },
            "&:hover": {
              bgcolor: COLORS.Wild_Sand,
            },
          }}
          inputProps={{
            style: {
              height: "50px",
              fontSize: "20px",
              padding: "0px",
            },
          }}
        />
      </form>
    </>
  );
};

export default Searchbar;
