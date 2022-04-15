// import { Box, Select } from "grommet";
import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import throttle from "lodash.throttle";

import client from "../client";
import { ForecastBody } from "../client/types";
import WeatherDisplay from "../components/WeatherDisplay";
import { SyntheticEvent } from "react";

const defaultOptions: string[] = [];

const Main = (): JSX.Element => {
  const [forecast, setForecast] = useState<ForecastBody>({} as ForecastBody);
  const [locationSearchValue, setLocationSearchValue] = useState("");
  const [locationSearchOptions, setLocationSearchOptions] =
    useState(defaultOptions);

  // Get locations and present in nice format
  const getLocations = async (text: string) => {
    if (text) {
      const newLocations = await client.getLocationSearch(text);
      setLocationSearchOptions(
        newLocations?.map(
          (location) =>
            `${location.name}, ${location.region}, ${location.country}`
        ) || []
      );
    }
  };

  // On search change, pass into throttle to getLocations
  const onChangeHandler = useMemo(() => throttle(getLocations, 800), []);

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
      {/* <Select
          options={locationSearchOptions}
          value={locationSearchValue}
          onChange={({ option }) => setLocationSearchValue(option)}
          onSearch={onChangeHandler}
          searchPlaceholder="Type in a location!"
        /> */}
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label="Search a location" fullWidth />
        )}
        filterOptions={(x) => x}
        value={locationSearchValue}
        options={locationSearchOptions}
        autoComplete
        onChange={(event: SyntheticEvent, newValue: string | null) =>
          setLocationSearchValue(newValue || "")
        }
        onInputChange={(event: SyntheticEvent, newInputValue: string) =>
          onChangeHandler(newInputValue)
        }
        noOptionsText="No locations"
      />
      <WeatherDisplay forecast={forecast} />
    </>
  );
};

export default Main;
