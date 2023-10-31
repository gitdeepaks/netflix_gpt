import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideos: null,
  },
  reducers: {
    addNowPlayingMovies(state, action) {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies(state, action) {
      state.popularMovies = action.payload;
    },
    addTrailerVideos(state, action) {
      state.trailerVideos = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideos, addPopularMovies } =
  moviesSlice.actions;
export default moviesSlice.reducer;
