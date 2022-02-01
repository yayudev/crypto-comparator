import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import { Login } from "./login.view";

describe("Login", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const form = screen.getByTestId("login-form");

    expect(form).toBeInTheDocument();
  });

  it("should render an error if the first name is missing", async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    const lastNameInput = screen.getByTestId("last-name-input");
    const emailInput = screen.getByTestId("email-input");
    const phoneNumberInput = screen.getByTestId("phone-number-input");
    const submitButton = screen.getByTestId("submit-button");

    await waitFor(() => user.type(lastNameInput, "Doe"));
    await waitFor(() => user.type(emailInput, "john@doe.com"));
    await waitFor(() => user.type(phoneNumberInput, "1234567890"));
    await waitFor(() => user.click(submitButton));
      
    expect(screen.getByText("First name is required")).toBeInTheDocument();
  });

  it("should render an error if the last name is missing", async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    const firstNameInput = screen.getByTestId("first-name-input");
    const emailInput = screen.getByTestId("email-input");
    const phoneNumberInput = screen.getByTestId("phone-number-input");
    const submitButton = screen.getByTestId("submit-button");

    await waitFor(() => user.type(firstNameInput, "John"));
    await waitFor(() => user.type(emailInput, "john@doe.com"));
    await waitFor(() => user.type(phoneNumberInput, "1234567890"));
    await waitFor(() => user.click(submitButton));
      
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
  });

  it("should render an error if the email is missing", async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const phoneNumberInput = screen.getByTestId("phone-number-input");
    const submitButton = screen.getByTestId("submit-button");

    await waitFor(() => user.type(firstNameInput, "John"));
    await waitFor(() => user.type(lastNameInput, "Doe"));
    await waitFor(() => user.type(phoneNumberInput, "1234567890"));
    await waitFor(() => user.click(submitButton));
      
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("should render an error if phone is invalid", async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const emailInput = screen.getByTestId("email-input");
    const phoneNumberInput = screen.getByTestId("phone-number-input");
    const submitButton = screen.getByTestId("submit-button");

    await waitFor(() => user.type(firstNameInput, "John"));
    await waitFor(() => user.type(lastNameInput, "Doe"));
    await waitFor(() => user.type(emailInput, "john@doe.com"));
    await waitFor(() => user.type(phoneNumberInput, "123"));
    await waitFor(() => user.click(submitButton));
      
    expect(screen.getByText("Phone must be valid")).toBeInTheDocument();
  });

  it("should render an error if phone is missing", async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-button");

    await waitFor(() => user.type(firstNameInput, "John"));
    await waitFor(() => user.type(lastNameInput, "Doe"));
    await waitFor(() => user.type(emailInput, "john@doe.com"));
    await waitFor(() => user.click(submitButton));
      
    expect(screen.getByText("Phone is required")).toBeInTheDocument();
  });
});
