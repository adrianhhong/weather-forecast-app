import client from "..";
import { forecastData } from "./fixtures";

describe("client tests", () => {
  describe("getForecast", () => {
    // beforeEach(async () => {
    //   // Restore all spyOn mocks
    //   jest.restoreAllMocks();
    //   // Add a spy to fetch to return data
    //   (jest.spyOn(global, "fetch") as jest.Mock).mockImplementation(() =>
    //     Promise.resolve({
    //       json: () => Promise.resolve(forecastData),
    //     })
    //   );
    // });

    it("should", async () => {
      const res = await client.getForecast("Melbourne");

      expect(res).toEqual("Hello human!");
    });
  });
});
