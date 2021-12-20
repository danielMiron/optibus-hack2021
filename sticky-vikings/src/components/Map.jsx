import React from "react";
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

const destination = "Haifa";
const origin = "שלמה אבן גבירול, Tel Aviv-Yafo";
let c =1
function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB0FG9qfrSxnOmQEeQUc5oHGHv5HD97MLg",
  });

  const [map, setMap] = React.useState(null);
  const [route, setRoute] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const options = React.useMemo(() => ({
    destination,
    origin,
    travelMode: "TRANSIT",
  }), [])

  const onResponse = React.useCallback((res) => {
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
