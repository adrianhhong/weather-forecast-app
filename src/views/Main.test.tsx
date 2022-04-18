import React from "react";
import { render, screen } from "@testing-library/react";
import Main from "./Main";

it("should not render WeatherDisplay on page load", () => {
  render(<Main />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
