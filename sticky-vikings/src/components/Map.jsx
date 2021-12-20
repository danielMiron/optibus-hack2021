import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import Search from "./Search";
import Rating from "./Rating";
import Box from "@mui/material/Box";
import { Chip, Stack, Typography } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const theme = [
  {
    featureType: "all",
    stylers: [{ color: "#C0C0C0" }],
  },
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

function getDirectionLines({ routes }) {
  const allSteps = routes?.[0]?.legs[0]?.steps || [];

  const transitSteps = allSteps.filter(
    (step) => step.travel_mode === "TRANSIT"
  );
  console.log("transitSteps", transitSteps);
  const finaleData = transitSteps.map((step) => step.transit.line);
  console.log("finaleData", finaleData);
  return finaleData;
}
const mapOptions = {
  mapId: "5aef37aa44030772",
  center: {
    lat: 32.0929,
    lng: 34.8072,
  },
};
function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB0FG9qfrSxnOmQEeQUc5oHGHv5HD97MLg",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [badRating, setBadRating] = useState(false);

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [route, setRoute] = useState(null);

  const [options, setOptions] = useState({
    destination: "",
    origin: "",
    travelMode: "TRANSIT",
  });
  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onSearch = (origin, destination) => {
    console.log("onSearch!!!", { origin, destination });
    setOptions({ travelMode: "TRANSIT", origin, destination });
    setShouldUpdate(true);
  };

  const onResponse = useCallback(
    (res) => {
      shouldUpdate && setRoute(res);
      setShouldUpdate(false);
    },
    [shouldUpdate]
  );

  const onRating = useCallback((rating) => {
    if (rating < 3) {
      setBadRating(true);
    }
  }, []);

  const handleChipClick = () => {
    setBadRating(false);
    console.info("You clicked the Chip.");
  };

  return isLoaded ? (
    <>
      <Search onSearch={onSearch} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={mapOptions}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {options.destination && options.origin && (
          <DirectionsService
            // required
            options={options}
            // required
            callback={(e) => onResponse(e)}
            // optional
            onLoad={(directionsService) => {
              console.log(
                "DirectionsService onLoad directionsService: ",
                directionsService
              );
            }}
            // optional
            onUnmount={(directionsService) => {
              console.log(
                "DirectionsService onUnmount directionsService: ",
                directionsService
              );
            }}
          />
        )}

        {route && (
          <DirectionsRenderer
            // @ts-ignore
            panel={document.getElementById("panel")}
            // required
            options={{
              directions: route,
            }}
            // optional
            onLoad={(directionsRenderer) => {
              console.log(
                "DirectionsRenderer onLoad directionsRenderer: ",
                directionsRenderer
              );
            }}
            // optional
            onUnmount={(directionsRenderer) => {
              console.log(
                "DirectionsRenderer onUnmount directionsRenderer: ",
                directionsRenderer
              );
            }}
          />
        )}
      </GoogleMap>

      {route && <Rating onRating={onRating}></Rating>}
      {route && (
        <Box
          sx={{
            color: "#3fa8ff",
            backgroundColor: "black",
            height: "200px",
            display: badRating ? "block" : "none",
          }}
        >
          <Typography> What Can we do Better?</Typography>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="wrap"
            spacing={2}
          >
            <Chip
              sx={{ m: 2 }}
              label="too crowded"
              color="primary"
              variant="outlined"
              onClick={handleChipClick}
            />
            <Chip
              sx={{ m: 2 }}
              label="low frequency"
              color="primary"
              variant="outlined"
              onClick={handleChipClick}
            />
            <Chip
              sx={{ m: 2 }}
              label="too many changeovers"
              color="primary"
              variant="outlined"
              onClick={handleChipClick}
            />
            <Chip
              sx={{ m: 2 }}
              label="to long of a route"
              color="primary"
              variant="outlined"
              onClick={handleChipClick}
            />
          </Stack>
        </Box>
      )}
      <div id="panel" sx={badRating && { display: "none" }}></div>
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
