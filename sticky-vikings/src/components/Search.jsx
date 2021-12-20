import React, { useState, useCallback } from "react";
import {
  Divider,
  IconButton,
  InputBase as MuiInput,
  Paper as MuiPaper,
  Stack as MuiStack,
  styled,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";

import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";

const Stack = styled(MuiStack)({
  paddingTop: "60px",
  width: "100%",
  zIndex: 10,
  position: "fixed",
});

const Paper = styled(MuiPaper)({
  backgroundColor: "#344152",
  ".input": {
    flexGrow: 1,
    marginLeft: "4px",
    width: "100%",
  },
});

const InputBase = styled(MuiInput)({
  color: "#fff",
  fontWeight: "bold",
});

const Search = ({ onSearch: propsOnSearch }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [autocompleteOrg, setAutocompleteOrg] = useState(null);
  const [autocompleteDst, setAutocompleteDst] = useState(null);

  const onSearch = () => {
    propsOnSearch(origin, destination);
  };

  const onPlaceLoadOrg = useCallback((autocomplete) => {
    setAutocompleteOrg(autocomplete);
  }, []);

  const onPlaceLoadDst = useCallback((autocomplete) => {
    setAutocompleteDst(autocomplete);
  }, []);

  const onPlaceChangedOrg = useCallback(() => {
    if (autocompleteOrg !== null) {
      console.log(autocompleteOrg.getPlace());
      setOrigin(autocompleteOrg.getPlace().formatted_address);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }, [autocompleteOrg]);

  const onPlaceChangedDst = useCallback(() => {
    if (autocompleteDst !== null) {
      console.log(autocompleteDst.getPlace());
      setDestination(autocompleteDst.getPlace().formatted_address);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }, [autocompleteDst]);

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
        <Autocomplete
          className="input"
          style={{ backgroundColor: "red" }}
          onLoad={onPlaceLoadOrg}
          onPlaceChanged={onPlaceChangedOrg}
        >
          <InputBase fullWidth placeholder="Origin" />
        </Autocomplete>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <Autocomplete
          className="input"
          onLoad={onPlaceLoadDst}
          onPlaceChanged={onPlaceChangedDst}
        >
          <InputBase placeholder="Destination" fullWidth />
        </Autocomplete>

        {/* <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Destination"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        /> */}

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
