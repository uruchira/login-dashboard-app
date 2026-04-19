import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AuthProvider, useAuth } from "./AuthContext";
import type { User } from "../types";

function AuthConsumer() {
  const { user, setNewUser } = useAuth();

  const handleSetUser = () => {
    const nextUser: User = { id: "user-1", username: "test@example.com" };
    setNewUser(nextUser);
  };

  return (
    <div>
      <p>{user ? user.username : "No user"}</p>
      <button onClick={handleSetUser}>Set User</button>
    </div>
  );
}

function OutsideProviderConsumer() {
  useAuth();
  return null;
}

describe("AuthContext", () => {
  it("provides default user and updates user via setNewUser", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>,
    );

    expect(screen.getByText("No user")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Set User" }));
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("throws when useAuth is used outside AuthProvider", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() => render(<OutsideProviderConsumer />)).toThrow(
      "useAuth must be used within AuthProvider",
    );

    consoleErrorSpy.mockRestore();
  });
});
