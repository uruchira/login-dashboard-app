import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

import Login from "./Login";
import { useAuth } from "../../contexts/AuthContext";
import { userLogin } from "../../services/authService";
import {
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REQUIRED_ERROR,
  USERNAME_INVALID_ERROR,
  USERNAME_REQUIRED_ERROR,
} from "../../constants";

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

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../services/authService", () => ({
  userLogin: vi.fn(),
}));

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as Mock).mockReturnValue({
      user: null,
      setNewUser: mockSetNewUser,
    });
  });

  it("shows validation errors for empty and invalid inputs", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    await user.click(emailInput);
    await user.tab();
    expect(await screen.findByText(USERNAME_REQUIRED_ERROR)).toBeInTheDocument();

    await user.type(emailInput, "not-an-email");
    expect(screen.getByText(USERNAME_INVALID_ERROR)).toBeInTheDocument();

    await user.click(passwordInput);
    await user.tab();
    expect(await screen.findByText(PASSWORD_REQUIRED_ERROR)).toBeInTheDocument();

    await user.type(passwordInput, "short");
    expect(screen.getByText(PASSWORD_MIN_LENGTH_ERROR)).toBeInTheDocument();
  });

  it("keeps submit button disabled until form is valid", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    expect(submitButton).toBeDisabled();

    await user.type(emailInput, "user@example.com");
    expect(submitButton).toBeDisabled();

    await user.type(passwordInput, "password123");
    expect(submitButton).toBeEnabled();
  });

  it("submits valid credentials and redirects on success", async () => {
    const user = userEvent.setup();
    (userLogin as Mock).mockResolvedValue({
      success: true,
      user: { id: "1", username: "user@example.com" },
    });

    render(<Login />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledWith("user@example.com", "password123");
      expect(mockSetNewUser).toHaveBeenCalledWith({
        id: "1",
        username: "user@example.com",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows api error message when login fails", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    (userLogin as Mock).mockResolvedValue({
      success: false,
      error: "Invalid Username or Password",
    });

    render(<Login />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("Invalid Username or Password"),
    ).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("shows network error when request throws", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    (userLogin as Mock).mockRejectedValue(new Error("request failed"));

    render(<Login />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("Network issue. Please try again."),
    ).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
