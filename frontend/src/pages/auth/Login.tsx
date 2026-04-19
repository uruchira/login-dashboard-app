import React, { useState, type ChangeEvent, type FocusEvent } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import { userLogin } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

import type { LoginFormState, LoginErrorState } from "../../types";
import {
  DEFAULT_LOGIN_DATA,
  USERNAME,
  PASSWORD,
  USERNAME_REQUIRED_ERROR,
  USERNAME_INVALID_ERROR,
  PASSWORD_REQUIRED_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
} from "../../constants";

const Login: React.FC = () => {
  const { setNewUser } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] =
    useState<LoginFormState>(DEFAULT_LOGIN_DATA);
  const [errors, setErrors] = useState<LoginErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (fieldName: string, fieldValue: string) => {
    let errorMessage = "";
    if (fieldName === USERNAME) {
      if (validator.isEmpty(fieldValue)) errorMessage = USERNAME_REQUIRED_ERROR;
      else if (!validator.isEmail(fieldValue))
        errorMessage = USERNAME_INVALID_ERROR;
    }

    if (fieldName === PASSWORD) {
      if (validator.isEmpty(fieldValue)) errorMessage = PASSWORD_REQUIRED_ERROR;
      else if (!validator.isLength(fieldValue, { min: 8 }))
        errorMessage = PASSWORD_MIN_LENGTH_ERROR;
    }
    return errorMessage;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validate(name, value);

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const isValid =
    Object.values(errors).every((err) => !err) &&
    loginData.username &&
    loginData.password;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isValid) {
      try {
        setIsSubmitting(true);
        const response = await userLogin(
          loginData.username,
          loginData.password,
        );
        if (response.success) {
          if (response.user) setNewUser(response.user);
          navigate("/dashboard");
        } else {
          console.error(response.error);
          setApiError(response.error || "Login failed. Please try again.");
        }
      } catch (err: unknown) {
        console.error("Network issue:", err);
        setApiError("Network issue. Please try again.");
      }
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
            {apiError && (
              <p className="text-red-400 text-sm font-medium mb-4">
                {apiError}
              </p>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                autoComplete="off"
                value={loginData.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && (
                <p className="text-red-400 text-sm font-medium">
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
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={loginData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <p className="text-red-400 text-sm font-medium">
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
