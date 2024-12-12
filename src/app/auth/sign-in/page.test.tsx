import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";
import SignInPage from "./page";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(() => new Promise((resolve) => setTimeout(resolve, 500))),
}));

describe("SignInPage", () => {
  it("renders the login form with all fields", () => {
    render(<SignInPage />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Insert your email");
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Insert your password");
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Sign In" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it("disables the submit button while submitting", async () => {
    render(<SignInPage />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("Insert your email");
    const passwordInput = screen.getByPlaceholderText("Insert your password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password123",
        redirect: true,
        callbackUrl: "/",
      });
    });
  });

  it("shows validation messages for invalid input", async () => {
    render(<SignInPage />);
    const user = userEvent.setup();

    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid email/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });
});
