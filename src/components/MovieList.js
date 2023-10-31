import React, { useEffect } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies = [] }) => {
  console.log(movies);

  useEffect(() => {
    const scrollableDivs = document.querySelectorAll(".hide-scrollbar");

    const handleScroll = (event) => {
      event.currentTarget.scrollLeft += event.deltaY;
      event.preventDefault();
    };

    scrollableDivs.forEach((div) => {
      div.addEventListener("wheel", handleScroll);
    });

    return () => {
      scrollableDivs.forEach((div) => {
        div.removeEventListener("wheel", handleScroll);
      });
    };
  }, []);
  return (
    <div className="px-6">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll hide-scrollbar cursor-pointer ">
        <div className="flex">
          {Array.isArray(movies) &&
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
