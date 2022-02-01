import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoadingSpinner } from "./loading-spinner.component";

describe("LoadingSpinner", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <LoadingSpinner />
      </MemoryRouter>
    );
    const spinner = screen.getByTestId("loading-spinner");

    expect(spinner).toBeInTheDocument();
  });
});
