# Weather Forecast App

Provide a location, and we will provide the forecast for the next 2 days!
Uses https://www.weatherapi.com/.

## Testing

- Stumbled across this: https://kentcdodds.com/blog/stop-mocking-fetch and tried it out. It works really well because it avoids all the trouble mocking fetch and getting something wrong (missing headers, etc.). It mocks on the network level. Furthermore, I can use it in local development if the API actually goes down.

## Improvements

- Types were generated using an online JSON to Typescript tool for convenience. A further look into cleaning up the types may be needed.
