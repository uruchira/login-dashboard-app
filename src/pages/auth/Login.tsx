import React, { useState, type ChangeEvent, type FocusEvent } from "react";
import validator from "validator";
import type { LoginFormState, LoginErrorState } from "../../types";
import {
  USERNAME,
  PASSWORD,
  USERNAME_REQUIRED_ERROR,
  USERNAME_INVALID_ERROR,
  PASSWORD_REQUIRED_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
} from "../../constants";

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginFormState>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMsg = "";

    if (name === USERNAME) {
      if (validator.isEmpty(value)) errorMsg = USERNAME_REQUIRED_ERROR;
      else if (!validator.isEmail(value)) errorMsg = USERNAME_INVALID_ERROR;
    }

    if (name === PASSWORD) {
      if (validator.isEmpty(value)) errorMsg = PASSWORD_REQUIRED_ERROR;
      else if (!validator.isLength(value, { min: 8 }))
        errorMsg = PASSWORD_MIN_LENGTH_ERROR;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const isValid =
    Object.values(errors).every((err) => !err) &&
    loginData.username &&
    loginData.password;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isValid) {
      setIsSubmitting(true);
      console.log("Form Submitted:", loginData);
      console.log("Redirected to dashboard");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl border-1 border-gray-300 border-solid overflow-hidden max-w-md w-full">
        <div className="p-6">
          <h2 className="text-slate-800 text-2xl font-bold text-center">
            Welcome Back
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={loginData.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.username}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={loginData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.password}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full py-2 px-4 text-white rounded-lg uppercase mt-4 ${
                !isValid || isSubmitting
                  ? "cursor-not-allowed opacity-80 bg-gray-500"
                  : "opacity-100 bg-blue-900"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
