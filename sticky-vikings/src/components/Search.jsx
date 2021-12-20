import React, { useState } from "react";
import {
  Divider,
  IconButton,
  InputBase as MuiInput,
  Paper as MuiPaper,
  Stack as MuiStack,
  styled,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";

const Stack = styled(MuiStack)({
  paddingTop: "60px",
  width: "100%",
  zIndex: 10,
  position: "fixed",
});

const Paper = styled(MuiPaper)({
  backgroundColor: "#344152"
});


const InputBase = styled(MuiInput)({
  color: "#fff",
  fontWeight: "bold"
});

const Search = ({ onSearch: propsOnSearch }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const onSearch = () => {
    propsOnSearch(origin, destination);
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "92%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Origin"
          value={origin}
          onChange={(e) => {
            setOrigin(e.target.value);
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Destination"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={onSearch}
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <DirectionsIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default React.memo(Search);
