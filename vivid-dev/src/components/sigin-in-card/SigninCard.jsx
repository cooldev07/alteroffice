import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signInUser } from "../../features";
import { PrimaryButton, PrimaryOutlinedButton, LoaderOverlay } from "../";
import { PasswordInput } from "../";
import { Logo } from "../logo/Logo";

const SigninCard = () => {
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [signInInput, setSignInInput] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { userName, password, rememberMe } = signInInput;

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitted) {
      dispatch(
        signInUser({
          username: userName,
          password,
        })
      );
    }
  }, [formErrors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rememberMe") {
      setSignInInput((prev) => ({
        ...prev,
        rememberMe: !prev.rememberMe,
      }));
    } else {
      setSignInInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateInput = (inputs) => {
    const errors = {};
    if (!inputs.userName) {
      errors.userName = "user name is required";
    }
    if (!inputs.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateInput(signInInput));
    setIsSubmitted(true);
  };

  const loginAsGuest = (e) => {
    e.preventDefault();
    setSignInInput({
      userName: "johndoe",
      password: 12345678,
      rememberMe: false,
    });
    dispatch(
      signInUser({
        username: "johndoe",
        password: "12345678",
      })
    );
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col ">
      {authLoading && <LoaderOverlay />}
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <Logo fontSize={"text-5xl"} />
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full dark:bg-slate-900 mt-10">
          <h1 className="mb-8 text-3xl text-center dark:text-white">Sign In</h1>

          <label>UserName</label>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded"
            name="userName"
            value={userName}
            onChange={handleInputChange}
          />

          <p className="text-red-500 m-0 py-3">{formErrors.userName}</p>

          <label>Password</label>
          <PasswordInput
            name="password"
            placeholder="Password"
            inputValue={password}
            handleInputChange={handleInputChange}
          />
          <p className="text-red-500 m-0 py-3">{formErrors.password}</p>

          <div className="text-center my-2">
            <label className="cursor-pointer dark:text-white flex gap-2 items-center justify-center">
              <input
                onChange={handleInputChange}
                type="checkbox"
                checked={rememberMe}
                name="rememberMe"
              />
              Remember Me
            </label>
          </div>

          <div className="flex flex-col gap-6 mt-5">
            <PrimaryButton clickHandler={handleSignInSubmit} isLoading={false}>
              Sign in
            </PrimaryButton>
            <PrimaryOutlinedButton clickHandler={loginAsGuest}>
              Sign in with test credentials
            </PrimaryOutlinedButton>
          </div>
          <div className="text-center mt-5">
            <Link
              className="ml-2 hover:underline dark:text-white"
              to={"/signup"}
            >
              Create an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SigninCard };
