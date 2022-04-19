import { render, screen, waitFor } from "@testing-library/react";
import Main from "./Main";
import user from "@testing-library/user-event";
import { server, rest } from "../mocks/browser";

it("should not render WeatherDisplay on page load", () => {
  render(<Main />);
  const today = screen.queryByText("Now");
  expect(today).toBeNull();
  const weeklyForecast = screen.queryByText("Weekly Forecast");
  expect(weeklyForecast).toBeNull();
});

it("should see 10 options when locations are searched", async () => {
  render(<Main />);
  const search = screen.getByRole("combobox", { name: /search a location/i });
  user.type(search, "Melbourne");
  await waitFor(() => {
    expect(
      screen.getByRole("option", { name: "Melbourne, Victoria, Australia" })
    ).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getAllByRole("option").length).toBe(10);
  });
});

it("should render WeatherDisplay when a location is selected", async () => {
  render(<Main />);
  const search = screen.getByRole("combobox", { name: /search a location/i });
  user.type(search, "Melbourne");
  await screen.findByRole("option", { name: "Melbourne, Victoria, Australia" });
  user.click(
    screen.getByRole("option", { name: "Melbourne, Victoria, Australia" })
  );
  await waitFor(() => {
    expect(screen.getByRole("heading", { name: "Now" })).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: "Weekly Forecast" })
    ).toBeInTheDocument();
  });
});

it("should not show any autocomplete options when search returns an error", async () => {
  // Mock error response
  server.use(
    rest.get(
      "https://api.weatherapi.com/v1/search.json",
      async (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: "something went wrong" })
        );
      }
    )
  );
  render(<Main />);
  const search = screen.getByRole("combobox", { name: /search a location/i });
  user.type(search, "Melbourne");
  await waitFor(() => {
    expect(
      screen.queryByRole("option", { name: "Melbourne, Victoria, Australia" })
    ).toBeNull();
  });
});
