import React, {useState, useCallback, useMemo} from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer

} from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "800px",
};

const center = {
  lat: 32.0929,
  lng: 34.807,
};

let c =1

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

  const options = useMemo(() => ({
    destination,
    origin,
    travelMode: "TRANSIT",
  }), [destination, origin])

  const onResponse = useCallback((res) => {
    console.log({ destination, origin, res });
    c && !route && setRoute(res)
  },[route])
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <DirectionsService
        // required
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
  ) : (
    <></>
  );
}

export default React.memo(Map);
