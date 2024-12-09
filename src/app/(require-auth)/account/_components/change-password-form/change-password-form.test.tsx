import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChangePasswordForm from ".";

describe("ChangePasswordForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show validation errors when passwords dont match", async () => {
    render(<ChangePasswordForm />);

    const oldPasswordInput = screen.getByLabelText(/old password/i);
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    const user = userEvent.setup();

    await user.type(oldPasswordInput, "OldPass123!");
    await user.type(newPasswordInput, "NewPass123!");
    await user.type(confirmPasswordInput, "DifferentPass123!");

    const submitButton = screen.getByText(/change password/i);
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  it("should show password requirements validation error", async () => {
    render(<ChangePasswordForm />);

    const oldPasswordInput = screen.getByLabelText(/old password/i);
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    const user = userEvent.setup();

    await user.type(oldPasswordInput, "OldPass123!");
    await user.type(newPasswordInput, "weak");
    await user.type(confirmPasswordInput, "weak");

    const submitButton = screen.getByText(/change password/i);
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/New password must be at least 6 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it("should handle successful form submission with valid data", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(<ChangePasswordForm />);

    const validPasswords = {
      oldPassword: "OldPass123!",
      newPassword: "NewPass123!",
      confirmPassword: "NewPass123!",
    };

    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText(/old password/i),
      validPasswords.oldPassword
    );
    await user.type(
      screen.getByLabelText(/new password/i),
      validPasswords.newPassword
    );
    await user.type(
      screen.getByLabelText(/confirm password/i),
      validPasswords.confirmPassword
    );

    const submitButton = screen.getByText(/change password/i);
    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Password Change Data:",
        validPasswords
      );
    });

    consoleSpy.mockRestore();
  });

  it("should toggle password visibility when clicking the eye icon", async () => {
    render(<ChangePasswordForm />);

    const passwordInput = screen.getByLabelText(/new password/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getAllByRole("button", {
      name: /Show password/i,
    })[1];

    const user = userEvent.setup();

    await user.click(toggleButton);

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "text");
    });

    await user.click(toggleButton);

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });
});
