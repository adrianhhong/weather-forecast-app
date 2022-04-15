import { useState, useEffect } from "react";
import client from "../client";

const Main = (): JSX.Element => {
  // const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [forecast, setForecast] = useState({});

  // Get forecast
  const getForecast = async () => {
    // setIsLoadingCart(true);
    const newForecast = await client.getForecast();
    if (newForecast != null) {
      setForecast(newForecast);
    }
    console.log(newForecast);
    // setIsLoadingCart(false);
  };

  // Get forecast on mount
  useEffect(() => {
    (async function forecastGetter() {
      getForecast();
    })();
  }, []);

  return (
    <>
      <h1>Weather Forecast App</h1>
    </>
  );
};

export default Main;
