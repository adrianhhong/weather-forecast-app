import { rest } from "msw";
import { forecastData, searchData } from "../client/tests/fixtures";

export const handlers = [
  rest.get(
    "https://api.weatherapi.com/v1/forecast.json",
    async (req, res, ctx) => {
      return res(ctx.json(forecastData));
    }
  ),

  rest.get(
    "https://api.weatherapi.com/v1/search.json",
    async (req, res, ctx) => {
      return res(ctx.json(searchData));
    }
  ),
];
