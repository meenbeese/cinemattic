import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

const Movies = lazy(() => import("../components/Movies"));
const Search = lazy(() => import("../pages/Search"));

const Container = () => {
  const { query } = useParams();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        {query ? <Search query={query} /> : <Movies />}
      </Suspense>
    </Box>
  );
};

export default Container;
