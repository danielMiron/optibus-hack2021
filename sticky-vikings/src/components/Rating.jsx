import React, { useState } from "react";

import MuiRating from "@mui/material/Rating";
import Box from "@mui/material/Box";

import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

export default function Rating({ onRating }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      className="rating"
      sx={{
        backgroundColor: "#344152",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <MuiRating
        size="large"
        precision="0.5"
        name="simple-controlled"
        value={rating}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        onChange={(event, newValue) => {
          setRating(newValue);
          onRating(newValue);
        }}
      />
      {rating !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
      )}
    </Box>
  );
}
