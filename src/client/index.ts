import { ForecastBody, LocationSearchBody } from "./types";
import config from "../config";

class Client {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async getForecast(
    locationQuery: string
  ): Promise<ForecastBody | undefined> {
    try {
      const res = await fetch(
        `${this.url}/forecast.json?key=${config.apiKey}&q=${locationQuery}&days=3&aqi=no&alerts=no`,
        {
          method: "GET",
        }
      );
      return await res.json();
    } catch (e) {
      // TODO: Reflect errors on frontend popup
      console.error(e);
    }
  }

  public async getLocationSearch(
    locationQuery: string
  ): Promise<LocationSearchBody[] | undefined> {
    try {
      const res = await fetch(
        `${this.url}/search.json?key=${config.apiKey}&q=${locationQuery}`,
        {
          method: "GET",
        }
      );
      return await res.json();
    } catch (e) {
      // TODO: Reflect errors on frontend popup
      console.error(e);
    }
  }
}

const client = new Client(config.url);

export default client;
