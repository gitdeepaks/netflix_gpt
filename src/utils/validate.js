export const checkValidData = (email, password, name, isSignup = false) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.<>?]).{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";

  if (isSignup) {
    const isNameValid = name.trim().length > 3;
    if (!isNameValid) return "Name is not valid or too short";
  }

  return null;
};
