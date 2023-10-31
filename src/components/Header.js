import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, Supportedlanguages } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { setLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search Button
    dispatch(toggleGptSearchView());
  };

  const hangleLanguageChange = (e) => {
    const language = e.target.value;
    // console.log(language);
    dispatch(setLanguage(language));
  };

  return (
    <div className="absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-40 h-14" src={LOGO} alt="Netflix Logo" />
      {user && (
        <div className="flex p-2">
          <select
            className=" py-2 bg-gray-800 text-white px-4 mx-4 my-2 rounded-lg bg-transparent"
            onChange={hangleLanguageChange}
          >
            {Supportedlanguages.map((language) => (
              <option key={language.identifier} value={language.identifier}>
                {language.name}
              </option>
            ))}
          </select>
          <button
            className="py-2 px-4 mx-4 my-2 bg-rose-700 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            GPT Search
          </button>
          <img className="w-12 h-12 " alt="userIcon" src={user?.photoURL} />
          <button onClick={handleSignOut} className="font-bold text-white">
            (SignOut)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
