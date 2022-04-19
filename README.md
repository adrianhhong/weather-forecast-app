# Weather Forecast App by Adrian Hong

App that searches the current and future weather (for the next 2 days) at a location. Uses https://www.weatherapi.com/ to get the weather information; mainly Forecast API and Search/Autocomplete API.

Uses [Material UI](https://mui.com/) for component UI.

## Local Usage

1. Run `npm ci` to install packages.
2. Create a file called `.env.local` and populate your weatherapi key `REACT_APP_WEATHER_API_KEY="your key goes here"`.
3. Run `npm run start` to build the app in the local browser.
4. Head to `http://localhost:3000` to view the application.

### Application

1. Search a location and pick one.
2. See the current weather and weather for the next 2 days.

## Testing

- Used `jest`, `jest-dom` and [react-testing-library](https://testing-library.com/) to write unit and integration tests.
- Used [Mock Service Worker (MSW)](https://mswjs.io/) to mock any API requests for testing purposes. This is really good as it saves me the trouble of mocking `fetch` and missing any production edge cases. Also, allowed me to test edge cases in development by running a local build with MSW intercepting any requests, and allowing me to send back my own responses.

## Improvements

- Types were generated using an online JSON to Typescript tool for convenience. A further look into cleaning up the types may be needed.
- I haven't elegantly shown any frontend indication in the case weatherapi returns an error. Future work may look into showing a popup when an error returns.

## Screenshots

<img src="./public/example.png " width="500" />
