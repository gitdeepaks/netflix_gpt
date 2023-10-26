export const checkValidData = (email, password, name) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.<>?]).{8,}$/.test(
      password
    );

  const isNameValid = name.length > 3;

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";
  if (!isNameValid) return "Name is not valid";
  return null;
};
