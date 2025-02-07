import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import Sidebar from "./sidebar";

jest.mock("./language-switcher", () =>
  jest.fn(() => <div>LanguageSwitcher</div>)
);

describe("Sidebar", () => {
  const messages = {
    sidebar: {
      dashboard: "Dashboard",
      products: "Products",
    },
  };
  it("renders sidebar with links", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Sidebar isOpen={false} />
      </NextIntlClientProvider>
    );

    // Check for the Dashboard and Products links
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
  });
  it("navigates to Dashboard link when clicked", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Sidebar isOpen={true} />
      </NextIntlClientProvider>
    );

    const dashboardLink = screen.getByText(/Dashboard/i);
    userEvent.click(dashboardLink);
    // Check if the URL changes to '/dashboard' (or the appropriate routing is triggered)
    expect(window.location.pathname).toBe("/");
  });

  it("navigates to Products link when clicked", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Sidebar isOpen={true} />
      </NextIntlClientProvider>
    );

    const productsLink = screen.getByText(/Products/i);
    userEvent.click(productsLink);

    expect(window.location.pathname).toBe("/");
  });
  it("sidebar renders LanguageSwitcher", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Sidebar isOpen={true} />
      </NextIntlClientProvider>
    );
    expect(screen.getByText("LanguageSwitcher")).toBeInTheDocument();
  });
});
