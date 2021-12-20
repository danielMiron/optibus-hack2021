import React, { useState } from "react";
import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import DirectionsIcon from '@mui/icons-material/Directions';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({onSearch: propsOnSearch}) => {
    const [destination, setDestination] = useState();
    const [origin, setOrigin] = useState("Tel Aviv-Yafo");

    const onSearch = (e) => {
        propsOnSearch()
    }

    return (<Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Destination"
          value={destination}
          onChange={e => {
              setDestination(e.target.value);}
          }
        />
        <IconButton type="submit" onClick={onSearch} sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <DirectionsIcon />
        </IconButton>
    </Paper>)
}

export default React.memo(Search);