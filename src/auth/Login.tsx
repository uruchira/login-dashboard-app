import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userLogin } from "./services";
import { useAuth } from "../contexts/AuthContext";

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = Partial<FormValues>;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    width: "300px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    width: "324px",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
};

const Login: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setNewUser } = useAuth();
  const navigate = useNavigate();

  const validate = (vals: FormValues): FormErrors => {
    const err: FormErrors = {};

    if (!vals.email) {
      err.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      err.email = "Invalid email address";
    }

    if (!vals.password) {
      err.password = "Password is required";
    } else if (vals.password.length < 6) {
      err.password = "Minimum 6 characters required";
    }

    return err;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);

    setErrors(validate(updatedValues));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    setTouched({
      email: true,
      password: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await userLogin(values.email, values.password);
      if (response.success) {
        if (response.user) setNewUser(response.user);
        navigate("/dashboard");
        console.log("Welcome", response.user?.username);
      } else {
        console.log("Login failed:", response.error);
      }
    } catch (err: unknown) {
      console.error("Network issue:", err);
    }

    setIsSubmitting(false);
  };

  const isValid = Object.keys(validate(values)).length === 0;

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <h2>Login</h2>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            style={styles.input}
          />
          {touched.email && errors.email && (
            <p style={styles.error}>{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={styles.input}
          />
          {touched.password && errors.password && (
            <p style={styles.error}>{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
