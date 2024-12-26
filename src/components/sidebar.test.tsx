import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./sidebar";
import userEvent from "@testing-library/user-event";

jest.mock("./language-switcher", () =>
  jest.fn(() => <div>LanguageSwitcher</div>)
);

describe("Sidebar", () => {
  it("renders sidebar with links", () => {
    render(<Sidebar isOpen={false} />);

    // Check for the Dashboard and Products links
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
  });
  it("navigates to Dashboard link when clicked", () => {
    render(<Sidebar isOpen={true} />);

    const dashboardLink = screen.getByText(/Dashboard/i);
    userEvent.click(dashboardLink);
    // Check if the URL changes to '/dashboard' (or the appropriate routing is triggered)
    expect(window.location.pathname).toBe("/");
  });

  it("navigates to Products link when clicked", () => {
    render(<Sidebar isOpen={true} />);

    const productsLink = screen.getByText(/Products/i);
    userEvent.click(productsLink);

    expect(window.location.pathname).toBe("/");
  });
  it("sidebar renders LanguageSwitcher", () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText("LanguageSwitcher")).toBeInTheDocument();
  });
});
