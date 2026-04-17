import React, { useState, type ChangeEvent, type FocusEvent } from "react";
import validator from "validator";

export type LoginFormState = {
  email: string;
  password: string;
};

export type LoginErrorState = {
  email?: string;
  password?: string;
};

const LoginComponent: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginFormState>({
    email: "",
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

    if (name === "email") {
      if (validator.isEmpty(value)) errorMsg = "Email is required";
      else if (!validator.isEmail(value)) errorMsg = "Invalid email format";
    }

    if (name === "password") {
      if (validator.isEmpty(value)) errorMsg = "Password is required";
      else if (!validator.isLength(value, { min: 8 }))
        errorMsg = "Password must be at least 8 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const isValid =
    Object.values(errors).every((err) => !err) &&
    loginData.email &&
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
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={loginData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.email}
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

export default LoginComponent;
