import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./navbar";
import userEvent from "@testing-library/user-event";

describe("Navbar", () => {
  let toggleSidebar: jest.Mock;

  beforeEach(() => {
    // Reset the mock function before each test
    toggleSidebar = jest.fn();
  });

  it("renders menu icon when sidebar is closed", () => {
    render(<Navbar toggleSidebar={toggleSidebar} sidebarOpen={false} />);

    // Check if the Menu icon is displayed (i.e., sidebar is closed)
    expect(screen.getByRole("button")).toContainHTML("<svg");
    expect(screen.getByRole("button")).toContainHTML("<Menu");

    // Check if the 'X' icon is not rendered
    expect(
      screen.queryByRole("button", { name: /X/i })
    ).not.toBeInTheDocument();
  });

  it("renders X icon when sidebar is open", () => {
    render(<Navbar toggleSidebar={toggleSidebar} sidebarOpen={true} />);

    // Check if the X icon is displayed (i.e., sidebar is open)
    expect(screen.getByRole("button")).toContainHTML("<svg"); // check for an svg element
    expect(screen.getByRole("button")).toContainHTML("<X");

    // Check if the 'Menu' icon is not rendered
    expect(
      screen.queryByRole("button", { name: /Menu/i })
    ).not.toBeInTheDocument();
  });

  it("calls toggleSidebar function when menu button is clicked", async () => {
    render(<Navbar toggleSidebar={toggleSidebar} sidebarOpen={false} />);

    // Find the button using role="button", as the "Menu" icon is inside the button
    const menuButton = screen.getByRole("button");

    // Simulate click event
    await userEvent.click(menuButton);

    // Ensure the toggleSidebar function is called
    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("calls toggleSidebar function when X button is clicked", async () => {
    render(<Navbar toggleSidebar={toggleSidebar} sidebarOpen={true} />);

    // Find the button using role="button", as the "X" icon is inside the button
    const xButton = screen.getByRole("button");

    // Simulate click event
    await userEvent.click(xButton);

    // Ensure the toggleSidebar function is called
    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("renders the logo and dashboard link", () => {
    render(<Navbar toggleSidebar={toggleSidebar} sidebarOpen={false} />);

    // Check if the Dashboard link is rendered correctly
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();

    // Check if the link has the correct href attribute
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
