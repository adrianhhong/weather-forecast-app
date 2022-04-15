import { ForecastBody } from "../client/types";

interface WeatherDisplayProps {
  forecast: ForecastBody;
}

const WeatherDisplay = ({ forecast }: WeatherDisplayProps): JSX.Element => {
  return (
    <>
      <h2>
        {forecast?.current?.feelslike_c &&
          `Feels like: ${forecast?.current?.feelslike_c}`}
      </h2>
      <h2>{forecast && forecast?.current?.condition?.text}</h2>
      <h2>{forecast && forecast?.current?.temp_c}</h2>
      <h2>{forecast && forecast?.current?.precip_mm}</h2>
    </>
  );
};

export default WeatherDisplay;
