import React, { useState, useCallback, useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Panel } from "./Panel";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 32.0929,
  lng: 34.807,
};

function getDirectionLines({ routes }: any) {
  const allSteps = routes?.[0]?.legs[0]?.steps || [];

  const transitSteps = allSteps.filter(
    (step: any) => step.travel_mode === "TRANSIT"
  );
  console.log("transitSteps", transitSteps);
  const finaleData = transitSteps.map((step: any) => step.transit.line);
  console.log("finaleData", finaleData);
  return finaleData;
}

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB0FG9qfrSxnOmQEeQUc5oHGHv5HD97MLg",
  });

  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [destination, setDestination] = useState("Haifa");
  const [origin, setOrigin] = useState("שלמה אבן גבירול, Tel Aviv-Yafo");
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const options = useMemo(
    () => ({
      destination,
      origin,
      travelMode: "TRANSIT",
    }),
    [destination, origin]
  );

  const onResponse = useCallback(
    (res) => {
      const panelData = res ? getDirectionLines(res) : null;
      console.log({ panelData });
      !route && setRoute(res);
    },
    [route]
  );

  const panelData = useMemo(
    () => (route ? getDirectionLines(route) : null),
    [route]
  );
  console.log("panelData", panelData);
  return isLoaded ? (
    <>
      {/* {panelData && <Panel steps={panelData}></Panel>} */}
      <div id="panel"></div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <DirectionsService
          // @ts-ignore
          options={options}
          // required
          callback={onResponse}
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
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
