import React from "react";
import languageConstants from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.config.language);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-gray-400 bg-opacity-80 rounded-xl grid grid-cols-12 ">
        <input
          type="text"
          className="p-4 m-4 rounded-md col-span-9 "
          placeholder={languageConstants[languageKey].gptSearchPlaceHoleder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          type="submit"
        >
          {languageConstants[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
