import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const emailRef = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // Use optional chaining to safely access the value
    const userEmail = emailRef.current?.value;
    const userPassword = password.current?.value;

    // Only try to access the name value if the sign-up form is active
    const userName = isSignInForm ? null : name.current?.value;

    if (!userEmail || !userPassword || (!isSignInForm && !userName)) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    const message = checkValidData(
      userEmail,
      userPassword,
      userName,
      !isSignInForm
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // signUp Logic
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.code + "-" + error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //signin logic
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="Netflix Background" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black mt-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "SignIn" : "SignUp"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full sm:w-auto bg-gray-700"
          />
        )}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full sm:w-auto bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full sm:w-auto bg-gray-700"
        />

        <p className="text-red-500 font-bold text-base sm:text-lg py-1 sm:py-2">{errorMessage}</p>

        <button
          type="submit"
          className="p-4 my-6 bg-red-700 w-full sm:w-auto rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "SignIn" : "SignUp"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already a registered user? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
