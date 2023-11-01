import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideos } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMoviesTrailer = (movieId) => {
  const dispath = useDispatch();

  const trailerVideos = useSelector((store) => store.movies.trailerVideos);

  // implement memoization for fetch

  // fetch trailer videos && updating the store with trailer videos data

  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );

    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispath(addTrailerVideos(trailer));
  };

  useEffect(() => {
    !trailerVideos && getMovieVideos();
  }, []);
};

export default useMoviesTrailer;
