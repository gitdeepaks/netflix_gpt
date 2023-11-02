import React, { useRef } from "react";
import languageConstants from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.config.language);

  const searchText = useRef(null);

  const dispath = useDispatch();

  // search the Movies in TMDB

  const searchMoviesTmdb = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    // Make an API to GPT ti get movie reresults

    const gptQuery =
      "Act as a Movie Search Engine and find best results for a user query" +
      searchText.current.value +
      "Give me List of bestest 5 Movies only, do not give the promps like 'Here are the top 5 comedy movies:' , comma seperated like the example result below. Example Results are : Gadar, Don, Sholay, DDLJ, Kuch Kuch Hota Hai,Golmaal, Koi Mil Gaya ";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) {
      //TDOD: Handle Error
    }
    console.log(gptResults.choices?.[0]?.message.content);
    const gptMovieList = gptResults.choices?.[0]?.message?.content.split(",");

    // For Each movie we will search the movies in TMDB and get the results

    const data = gptMovieList.map((movie) => searchMoviesTmdb(movie));
    //[Promise, Promise, Promise, Promise, Promise]
    const tmdbResults = await Promise.all(data);
    console.log(tmdbResults);
    dispath(
      addGptMovieResults({
        movieNames: gptMovieList,
        movieResults: tmdbResults,
      })
    );
  };
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-gray-400 bg-opacity-80 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-42 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 rounded-md col-span-9 "
          placeholder={languageConstants[languageKey].gptSearchPlaceHoleder}
        />
        <button
          className="col-span-3 m-4 py-1 sm:py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {languageConstants[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
