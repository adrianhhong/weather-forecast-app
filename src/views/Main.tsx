import { Select } from "grommet";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import client from "../client";
import { ForecastBody } from "../client/types";
import { useMemo } from "react";

const defaultOptions: string[] = [];

const Main = (): JSX.Element => {
  const [forecast, setForecast] = useState<ForecastBody>({} as ForecastBody);
  const [locationSearchValue, setLocationSearchValue] = useState("");
  const [locationSearchOptions, setLocationSearchOptions] =
    useState(defaultOptions);

  // Get locations and present in nice format
  const getLocations = async (text: string) => {
    const newLocations = await client.getLocationSearch(text);
    setLocationSearchOptions(
      newLocations?.map(
        (location) =>
          `${location.name}, ${location.region}, ${location.country}`
      ) || []
    );
  };

  // On search change, pass into debouncer to getLocations
  const onChangeHandler = useMemo(() => debounce(getLocations, 300), []);

  // Get forecast
  const getForecast = async (location: string) => {
    const newForecast = await client.getForecast(location);
    if (newForecast != null) {
      setForecast(newForecast);
    }
    console.log(newForecast);
  };

  // Invoke getForecast when location changes
  useEffect(() => {
    (async function forecastGetter() {
      getForecast(locationSearchValue);
    })();
  }, [locationSearchValue]);

  return (
    <>
      <h1>Weather Forecast App</h1>
      <h3>
        <i>Find out whether the weather is wet there! 💦</i>
      </h3>
      <Select
        options={locationSearchOptions}
        value={locationSearchValue}
        onChange={({ option }) => setLocationSearchValue(option)}
        onSearch={onChangeHandler}
        searchPlaceholder="Type in a location!"
      />
      <h2>{forecast && forecast?.current?.feelslike_c}</h2>
      <h2>{forecast && forecast?.current?.condition?.text}</h2>
      <h2>{forecast && forecast?.current?.temp_c}</h2>
      <h2>{forecast && forecast?.current?.precip_mm}</h2>
    </>
  );
};

export default Main;
