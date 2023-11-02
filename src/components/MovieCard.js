import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-full sm:w-48 pr-4">
      <img alt="Movie card" src={IMG_CDN + posterPath} />
    </div>
  );
};

export default MovieCard;
