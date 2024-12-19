import { render, screen } from "@testing-library/react";
import AccountPage from "./page";

const mockMe = jest.fn();
jest.mock("@/lib/trpc/server", () => ({
  trpc: {
    users: {
      me: () => mockMe(),
    },
  },
}));

jest.mock("./_components/account-form", () => {
  return jest.fn(() => <div data-testid="account-form">Account Form</div>);
});

jest.mock("./_components/change-password-form", () => {
  return jest.fn(() => (
    <div data-testid="change-password-form">Change Password Form</div>
  ));
});

describe("AccountPage", () => {
  const mockUserData = {
    firstName: "1",
    lastName: "Test User",
    email: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading state when data is not available", async () => {
    mockMe.mockResolvedValue(null);
    render(await AccountPage());
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render account form and change password form when data is available", async () => {
    mockMe.mockResolvedValue(mockUserData);
    render(await AccountPage());
    expect(screen.getByTestId("account-form")).toBeInTheDocument();
    expect(screen.getByTestId("change-password-form")).toBeInTheDocument();
  });
});
