import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountForm from ".";
import { trpc } from "@/lib/trpc/client";

jest.mock("@/lib/trpc/client", () => ({
  trpc: {
    users: {
      updateAccount: {
        useMutation: jest.fn(),
      },
    },
  },
}));

const mockData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};

describe("AccountForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial data", () => {
    // Basic mutation mock
    (trpc.users.updateAccount.useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });

    render(<AccountForm data={mockData} />);

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

    render(<AccountForm data={mockData} />);

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

    render(<AccountForm data={mockData} />);

    const submitButton = screen.getByText(/save changes/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(mockData);
    });
  });

  it("handles API error during submission", async () => {
    const mockError = new Error("API Error");
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const mockMutateAsync = jest.fn().mockRejectedValue(mockError);

    (trpc.users.updateAccount.useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });

    render(<AccountForm data={mockData} />);

    const submitButton = screen.getByText(/save changes/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error updating account:",
        mockError
      );
    });

    consoleSpy.mockRestore();
  });
});
