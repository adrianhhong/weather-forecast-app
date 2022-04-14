import { ForecastBody } from "./types";
import config from "../config";

class Client {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async getForecast(): Promise<ForecastBody | undefined> {
    try {
      const res = await fetch(
        `${this.url}/forecast.json?key=${config.apiKey}&q=London&days=2&aqi=no&alerts=no`,
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
