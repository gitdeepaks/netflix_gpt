import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
      <img
        className="w-40"
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="Netflix Logo"
      />
      {user && (
        <div className="flex p-4">
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
