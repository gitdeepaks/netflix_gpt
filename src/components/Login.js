import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
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
            photoURL:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACICAMAAAALZFNgAAAAY1BMVEUNfoD///8AeXsAdnj0+Pj6/f0Ac3UAbG+Qt7gAfH+51dXw9/fj7u7n8fGbxMWIt7h1rK1RmZsxiowkf4Fho6RrpafE3Nyty8zN4+OVv79Aj5CJsrMchIaozc6iwsN7q6zY6emh8HiqAAACWUlEQVR4nO3Z7ZaaMBAGYJiBaAJiEhEVUbj/q2ysHw22anBjT/f0ffZ3Zl8gGUhMEgAAAAAAAAAAgG9Iyn+hItHK2hVRvBSXihOziFoVaVqoNUeKIUk3eZoulBEToshkk16oJMoDkt32WnE3oSCr9EZFCbLa/qp4DL7LtEw9uwhPhw9+xXXozBMLf1jx9RyyzfyKQ+ClSZumb13AQ7QfV+zCHjfPx8OqLwcZP5ngS+Nj9CDqrSCkowepxhXrsIqye2vYE9SPK4b2JjH4o8oIbb4brUMV2hBo7Q/TMfqI35lyE9wjhTeuivK2IW/daBE8zL2hivOgYhnp/cvVpactpk05tvMmy4ZdO/W1/bii2ZVZ1uztxCuTLGazGUf8NpLsCoqIHzgAAAAA3138g6i3ELUmifuZRm+ca0lqVZENJmISmSyrnqcVJDbN+UvexsvRlq7gUIffFcmJ3ubTduEBxHnDlDeGgjYc5PYn3kZWRwvCxbXmdt/x8yySqesbfxc7YdP5ir9Pz1Tf0oMwkjgxy2Z0cpXmOt4KvjuMKprKdCzYPacrIhYiabUa8nRMxVw0CfXFXf180RzmfW1aa21r6n5eqTJL72UbO+XENySJ3dxH+Rknzwr3l9/fhrNFFW8zfSO5Pfx+xc+c5vVH+rsUXmt4meLYfnIHztJU5css2VAZ+ZmbcSMls1uff5ouF6Vb3YL/yjtXspBWb5rBTdLb/3ezttw2u9Oqjj8/n4VxLa2zbb3W8xOt3TpeJfyi6X4wjutjJ3RqbXF+6gEAAAAAAAAAAAAAAID/yA/BjxhlYV0/MgAAAABJRU5ErkJggg==",
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
              navigate("/browse");
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
          console.log(user);
          navigate("/browse");
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
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Netflix Background"
        />
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
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

        <button
          type="submit"
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
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
