import { toast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc/client";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signOut } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import ChangePasswordForm from ".";

jest.mock("@/lib/trpc/client", () => ({
  trpc: {
    users: {
      changePassword: {
        useMutation: jest.fn(),
      },
    },
  },
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn(),
}));

describe("ChangePasswordForm", () => {
  const messages = {
    accountSettings: {
      security: {
        title: "Security",
        oldPasswordField: {
          label: "Old Password",
          placeholder: "Enter old password",
        },
        passwordField: {
          label: "New Password",
          placeholder: "Enter new password",
        },
        confirmPasswordFiled: {
          label: "Confirm Password",
          placeholder: "Enter confirm password",
        },
        button: {
          label: "Change Password",
          loading: "Updating...",
        },
        errorMessage: "Unable to change password",
        successMessage: "Your password was changed successfully.",
      },
    },
  };

  const mockMutateAsync = jest.fn();
  const mockUseMutation = trpc.users.changePassword.useMutation as jest.Mock;

  beforeEach(() => {
    mockUseMutation.mockReturnValue({
      mutateAsync: mockMutateAsync,
    });
    (signOut as jest.Mock).mockClear();
    (toast as jest.Mock).mockClear();
    mockMutateAsync.mockClear();
  });

  const fillPasswordForm = async (
    oldPassword = "oldPassword123",
    newPassword = "newPassword456",
    confirmPassword = "newPassword456"
  ) => {
    const oldPasswordInput = screen.getByPlaceholderText("Enter old password");
    const newPasswordInput = screen.getByPlaceholderText("Enter new password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Enter confirm password");

    await userEvent.type(oldPasswordInput, oldPassword);
    await userEvent.type(newPasswordInput, newPassword);
    await userEvent.type(confirmPasswordInput, confirmPassword);

    const submitButton = screen.getByText("Change Password");
    await userEvent.click(submitButton);
  };

  test("renders form correctly", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChangePasswordForm />
      </NextIntlClientProvider>
    );

    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByLabelText("Old Password")).toBeInTheDocument();
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    mockMutateAsync.mockResolvedValue({});

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChangePasswordForm />
      </NextIntlClientProvider>
    );

    await fillPasswordForm();

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        oldPassword: "oldPassword123",
        password: "newPassword456",
        confirmPassword: "newPassword456",
      });

      expect(toast).toHaveBeenCalledWith({
        title: "Success",
        description: "Your password was changed successfully.",
        variant: "success",
        duration: 2000,
        onClose: expect.any(Function),
      });

      const toastCall = (toast as jest.Mock).mock.calls[0][0];
      if (toastCall.onClose) {
        toastCall.onClose();
        expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/auth/sign-in" });
      }
    });
  });

  test("handles submission error", async () => {
    const errorMessage = "Password change failed";
    mockMutateAsync.mockRejectedValue(new Error(errorMessage));

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChangePasswordForm />
      </NextIntlClientProvider>
    );

    await fillPasswordForm();

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      expect(signOut).not.toHaveBeenCalled();
    });
  });

  test("disables submit button during loading", async () => {
    mockUseMutation.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChangePasswordForm />
      </NextIntlClientProvider>
    );

    const submitButton = screen.getByRole("button", {
      name: /updating\.\.\./i,
    });

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Updating...");
  });

  test("shows validation errors", async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChangePasswordForm />
      </NextIntlClientProvider>
    );

    const submitButton = screen.getByText("Change Password");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Old password must be at least 6 characters long/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/New password must be at least 6 characters long/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Confirm password must match the new password/i)
      ).toBeInTheDocument();
    });
  });

  test("prevents submission when passwords do not match", async () => {
    mockMutateAsync.mockResolvedValue({});

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ChangePasswordForm />
      </NextIntlClientProvider>
    );

    const oldPasswordInput = screen.getByPlaceholderText("Enter old password");
    const newPasswordInput = screen.getByPlaceholderText("Enter new password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Enter confirm password");

    await userEvent.type(oldPasswordInput, "oldPassword123");
    await userEvent.type(newPasswordInput, "newPassword456");
    await userEvent.type(confirmPasswordInput, "differentPassword789");

    const submitButton = screen.getByText("Change Password");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      expect(mockMutateAsync).not.toHaveBeenCalled();
    });
  });
});
