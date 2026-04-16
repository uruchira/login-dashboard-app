import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach, describe, expect, it } from "vitest";

import Login from "./Login";
import { userLogin } from "./services";

const mockNavigate = vi.fn();
const mockSetNewUser = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    setNewUser: mockSetNewUser,
  }),
}));

vi.mock("./services", () => ({
  userLogin: vi.fn(),
}));

const mockedUserLogin = vi.mocked(userLogin);

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields and keeps submit disabled initially", () => {
    render(<Login />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeDisabled();
  });

  it("shows required validation errors after submit", () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "Login" });
    const form = submitButton.closest("form");

    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("enables submit button when both fields are valid", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password123" },
    });

    expect(screen.getByRole("button", { name: "Login" })).toBeEnabled();
  });

  it("shows invalid email format error", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Enter email"));

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  it("shows missing password error when email is valid", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Enter password"));
    fireEvent.submit(screen.getByRole("button", { name: "Login" }).closest("form")!);

    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(mockedUserLogin).not.toHaveBeenCalled();
  });

  it("submits credentials and navigates to dashboard on successful login", async () => {
    const user = { username: "john", token: "token-123" };
    mockedUserLogin.mockResolvedValueOnce({ success: true, user });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockedUserLogin).toHaveBeenCalledWith(
        "john@example.com",
        "password123",
      );
    });

    expect(mockSetNewUser).toHaveBeenCalledWith(user);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("does not navigate when login fails", async () => {
    mockedUserLogin.mockResolvedValueOnce({
      success: false,
      error: "Invalid credentials",
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockedUserLogin).toHaveBeenCalledWith(
        "john@example.com",
        "password123",
      );
    });

    expect(mockSetNewUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
