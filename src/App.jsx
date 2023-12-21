import React from "react";
import { Route, Routes } from "react-router-dom";
import { Details } from "./components/Details";
import Navbar from "./components/Navbar";
import Container from "./pages/Container";
import Trending from "./pages/Trending";
import Upcoming from "./pages/Upcoming";
import Favorite from "./pages/Favorite";
import { MovieProvider } from "./pages/Contextpage";
import { Snackbar } from "@mui/material";

const App = () => {
  return (
    <MovieProvider>
      <Snackbar
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <Navbar />
      <div className="md:ml-[15rem]">
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/moviedetail/:id" element={<Details />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/search/:query" element={<Container />} />
          <Route path="/search/" element={<Container />} />
        </Routes>
      </div>
    </MovieProvider>
  );
};

export default App;
