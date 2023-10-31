import React from "react";

const GptSearchBar = () => {
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-gray-400 bg-opacity-80 grid grid-cols-12 ">
        <input
          type="text"
          className="p-4 m-4 rounded-md col-span-9 "
          placeholder="What would you like to watch today"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
