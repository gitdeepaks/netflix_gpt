import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);

  const { movieNames, movieResults } = gpt;

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-rose-500 bg-opacity-30 text-white">
      <div>
        {movieNames.map((movieName, i) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[i]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
