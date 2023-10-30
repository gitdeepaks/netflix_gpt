import { useSelector } from "react-redux";
import useMoviesTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  // feth trailer
  const trailerVideo = useSelector((store) => store.movies?.trailerVideos);

  useMoviesTrailer(movieId);

  return (
    <div className="w-sreen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1&loop=0"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
