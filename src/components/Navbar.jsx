import React from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import Navdata from "../utilities/Navbar";
import COLORS from "../utilities/Color";
import Searchbar from "./Lookup";
import {
  AppBar,
  Button,
  Chip,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: `linear-gradient(45deg, ${COLORS.Brink_Pink} 30%, ${COLORS.Coral} 90%)`,
        borderRadius: "12px",
        boxShadow: "0 6px 10px rgba(0,0,0,0.4)",
        p: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Chip
            icon={
              <img src={logo} width="40" height="40" alt="Cinemattic logo" />
            }
            label={
              <Typography
                variant="h5"
                sx={{
                  flexGrow: 1,
                  color: COLORS.White,
                  textDecoration: "none",
                }}
              >
                Cinemattic
              </Typography>
            }
            sx={{
              height: "56px",
              backgroundColor: COLORS.Studio,
              borderRadius: "20px",
              padding: "5px",
              transition: "transform 0.3s, background-color 0.3s",
              "&:hover": {
                transform: "scale(1.04)",
                backgroundColor: COLORS.Brink_Pink,
              },
            }}
          />
        </Link>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {Navdata?.map((data) => (
            <Button
              key={data.Name}
              color="inherit"
              component={Link}
              to={data.link}
              sx={{
                textDecoration: "none",
                color: COLORS.White,
                "&:hover": { color: COLORS.Brink_Pink },
              }}
            >
              {data.Name}
            </Button>
          ))}
        </Stack>
        <Searchbar sx={{ width: "300px", marginLeft: "auto" }} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
