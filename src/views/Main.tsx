import { Autocomplete, Container, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useMemo } from "react";
import throttle from "lodash.throttle";

import client from "../client";
import { ForecastBody } from "../client/types";
import WeatherDisplay from "../components/WeatherDisplay";
import { SyntheticEvent } from "react";
import { Box } from "@mui/system";
import Footer from "../components/Footer";

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
    if (location) {
      const newForecast = await client.getForecast(location);
      if (newForecast != null) {
        setForecast(newForecast);
      }
      console.log(newForecast);
    }
  };

  // Invoke getForecast when location changes
  useEffect(() => {
    (async function forecastGetter() {
      getForecast(locationSearchValue || "");
    })();
  }, [locationSearchValue]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography component="h1" variant="h4">
            Weather Forecast App
          </Typography>
          <Typography component="h2" variant="body1">
            <i>Find out whether the weather is wet there! 💦</i>
          </Typography>
          <Autocomplete
            sx={{ width: 300 }}
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
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default Main;
