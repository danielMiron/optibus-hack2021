import * as React from "react";
import ReactMapGL from "react-map-gl";

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <div style={{ width:"100vw" ,height: "100vh" ,backgroundColor:"red"}}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoib3B0aWJ1cyIsImEiOiJja3hlam80cjA1MW9oMnBsYW9zNGk0bXBqIn0.Y0YxFay6eFdWRcjBlhIAVg"
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport: any) => setViewport(viewport)}
      />
    </div>


  );
}

export default Map;
