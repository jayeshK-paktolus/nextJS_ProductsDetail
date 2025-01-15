import { toast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc/client";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import AccountForm from ".";

jest.mock("@/lib/trpc/client", () => ({
  trpc: {
    users: {
      updateAccount: {
        useMutation: jest.fn(),
      },
    },
  },
}));

jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn(),
}));

const mockData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};

describe("AccountForm", () => {
  const messages = {
    accountSettings: {
      account: {
        title: "Account",
        emailField: {
          label: "Your email",
        },
        firstNameField: {
          label: "First name",
        },
        lastNameField: {
          label: "Last name",
        },
        button: "Save changes",
        errorMessage: "Unable to save changes",
        successMessage: "Your information was updated successfully.",
        signOut: "Sign Out",
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (toast as jest.Mock).mockClear();
  });

  it("renders with initial data", () => {
    // Basic mutation mock
    (trpc.users.updateAccount.useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });

    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <AccountForm data={mockData} />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText(/first name/i)).toHaveValue(
      mockData.firstName
    );
    expect(screen.getByLabelText(/last name/i)).toHaveValue(mockData.lastName);
    expect(screen.getByLabelText(/email/i)).toHaveValue(mockData.email);
  });

  it("displays validation errors for empty fields", async () => {
    (trpc.users.updateAccount.useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });

    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <AccountForm data={mockData} />
      </NextIntlClientProvider>
    );

    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: "" } });

    const submitButton = screen.getByText(/save changes/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/First Name must be at least 2 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it("handles form submission successfully", async () => {
    const mockMutateAsync = jest.fn().mockResolvedValue(mockData);

    (trpc.users.updateAccount.useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });

    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <AccountForm data={mockData} />
      </NextIntlClientProvider>
    );

    const submitButton = screen.getByText(/save changes/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(mockData);
    });
  });

  it("handles API error during submission", async () => {
    const mockError = new Error("API Error");
    const mockMutateAsync = jest.fn().mockRejectedValue(mockError);

    (trpc.users.updateAccount.useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });

    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <AccountForm data={mockData} />
      </NextIntlClientProvider>
    );

    const submitButton = screen.getByText(/save changes/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Error",
        description: "Unable to save changes",
        variant: "destructive",
      });
    });
  });
});
