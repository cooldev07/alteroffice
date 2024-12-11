import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signUpUser } from "../../features";
import { PrimaryButton, PasswordInput, LoaderOverlay, Logo } from "../";

const SignUpCard = () => {
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [signUpInput, setSignUpInput] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    firstName,
    lastName,
    userName,
    password,
    confirmPassword,
    termsAndConditions,
  } = signUpInput;

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitted) {
      dispatch(
        signUpUser({
          username: userName,
          password,
          firstName,
          lastName,
        })
      );
    }
  }, [formErrors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "termsAndConditions") {
      setSignUpInput((prev) => ({
        ...prev,
        termsAndConditions: !signUpInput.termsAndConditions,
      }));
    } else {
      setSignUpInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateInput(signUpInput));
    setIsSubmitted(true);
  };

  const validateInput = (inputs) => {
    const errors = {};
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const usernameRegex = /^[a-z0-9]+$/;
    if (!inputs.firstName) {
      errors.firstName = "Firstname is required";
    }
    if (!inputs.lastName) {
      errors.lastName = "Lastname is required";
    }
    if (!inputs.userName) {
      errors.userName = "User name is required";
    }
    if (inputs.userName.length < 4) {
      errors.userName = "User name must be atleast 4 characters long";
    }
    if (!usernameRegex.test(inputs.userName)) {
      errors.userName =
        "User name must contain only lower case letter and numbers";
    }
    if (!inputs.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(inputs.password)) {
      errors.password =
        "Password should contain atleast 1 number, 1 lower case, 1 uppercase and 1 special character";
    }
    if (inputs.confirmPassword !== inputs.password) {
      errors.confirmPassword = "Passwords don't match";
    }
    if (!inputs.termsAndConditions) {
      errors.termsAndConditions = "Must agree to terms and conditions";
    }
    return errors;
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      {authLoading && <LoaderOverlay />}
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <Logo fontSize={"text-5xl"} />
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full dark:bg-slate-900 mt-7">
          <h1 className="mb-8 text-3xl text-center dark:text-white">Sign up</h1>
          <label className="dark:text-white">First Name</label>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded"
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
          />

          <p className="text-red-500 m-0 py-3">{formErrors.firstName}</p>

          <label className="dark:text-white">Last Name</label>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded"
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
          />

          <p className="text-red-500 m-0 py-3">{formErrors.lastName}</p>

          <label className="dark:text-white">User Name</label>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded"
            name="userName"
            value={userName}
            onChange={handleInputChange}
          />

          <p className="text-red-500 m-0 py-3">{formErrors.userName}</p>

          <label className="dark:text-white">Password</label>
          <PasswordInput
            name="password"
            placeholder="Password"
            inputValue={password}
            handleInputChange={handleInputChange}
          />

          <p className="text-red-500 m-0 py-3">{formErrors.password}</p>

          <label className="dark:text-white">Confirm Password</label>
          <PasswordInput
            name="confirmPassword"
            placeholder="Password"
            inputValue={confirmPassword}
            handleInputChange={handleInputChange}
          />

          <p className="text-red-500 m-0 py-3">{formErrors.confirmPassword}</p>

          <div className="text-center my-2">
            <label className="cursor-pointer dark:text-white flex gap-2 items-center justify-center">
              <input
                type="checkbox"
                name="termsAndConditions"
                checked={termsAndConditions}
                onChange={handleInputChange}
              />
              I agree to all terms &amp; conditions
            </label>
            <p className="text-red-500 m-0 py-3">
              {formErrors.termsAndConditions}
            </p>
          </div>

          <div className="text-center mt-5">
            <PrimaryButton clickHandler={handleSignUpSubmit}>
              Create Account
            </PrimaryButton>
          </div>
          <div className="text-center mt-5">
            <Link className="ml-2 hover:underline dark:text-white" to={"/"}>
              Sign In?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUpCard };
