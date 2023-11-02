import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideos } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMoviesTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideos = useSelector((store) => store.movies.trailerVideos);

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      if (!data.ok) {
        throw new Error(
          `Error fetching trailers for movie with ID ${movieId}: ${data.statusText}`
        );
      }

      const json = await data.json();

      let filterData = [];
      if (json && Array.isArray(json.results)) {
        filterData = json.results.filter((video) => video.type === "Trailer");
      }

      const trailer = filterData.length
        ? filterData[0]
        : Array.isArray(json.results) && json.results.length
        ? json.results[0]
        : undefined;

      if (trailer) {
        dispatch(addTrailerVideos(trailer));
      } else {
        // Handle the scenario where no trailer is available.
        // For now, I'm just logging it, but you can expand on this.
        console.warn("No trailer available for movie with ID:", movieId);
      }
    } catch (error) {
      console.error("Error fetching movie trailers:", error);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, [movieId]);

  return trailerVideos; // Assuming you want to return the trailers from this hook.
};

export default useMoviesTrailer;
