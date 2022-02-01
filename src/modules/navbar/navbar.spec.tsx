import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserContext, UserProvider } from "../shared/user.context";
import { Navbar } from "./navbar.component";

describe("Navbar", () => {
  it("should render", () => {
    render(
      <UserProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </UserProvider>
    );
    const navbar = screen.getByTestId("navbar");

    expect(navbar).toBeInTheDocument();
  });


});
