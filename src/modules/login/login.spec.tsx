import { render, screen, act } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Login } from "./login.view";

describe("Login", () => {
  it("should render", () => {
    render(<Login />);
    const form = screen.getByTestId("login-form");

    expect(form).toBeInTheDocument();
  });

  it("should render an error if the first name is missing", async () => {
    render(<Login />);

    const lastNameInput = screen.getByTestId("last-name-input");
    const emailInput = screen.getByTestId("email-input");
    const phoneNumberInput = screen.getByTestId("phone-number-input");
    const submitButton = screen.getByTestId("submit-button");

    act(() => {
      user.type(lastNameInput, "Doe");
      user.type(emailInput, "jon@doe.com");
      user.type(phoneNumberInput, "1234567890");
      user.click(submitButton);
    });

    expect(screen.getByText("First name is required")).toBeInTheDocument();
  });
});
