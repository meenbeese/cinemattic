import React, { useContext } from "react";
import Contextpage from "../../pages/Contextpage";
import { Button, ButtonGroup, Box } from "@mui/material";

export const Pagebtn = () => {
  const { setPage, page } = useContext(Contextpage);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
      <ButtonGroup variant="contained" aria-label="contained button group">
        <Button onClick={() => setPage(page - 1)}>Back</Button>
        <Button disabled>{page}</Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </ButtonGroup>
    </Box>
  );
};
