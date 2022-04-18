import { Autocomplete, Container, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useMemo, SyntheticEvent } from "react";
import throttle from "lodash.throttle";
import { Box } from "@mui/system";
import { blue } from "@mui/material/colors";

import client from "../client";
import { ForecastBody } from "../client/types";
import WeatherDisplay from "../components/WeatherDisplay";

const defaultOptions: string[] = [];

const Main = (): JSX.Element => {
  const [forecast, setForecast] = useState<ForecastBody | null>(null);
  const [locationSearchValue, setLocationSearchValue] = useState("");
  const [locationSearchOptions, setLocationSearchOptions] =
    useState(defaultOptions);
  const [autocompleteLoading, setAutocompleteLoading] =
    useState<boolean>(false);
  const [forecastLoading, setForecastLoading] = useState<boolean>(false);

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
    setAutocompleteLoading(false);
  };

  // On search change, pass into throttle to getLocations
  const onChangeHandler = useMemo(() => throttle(getLocations, 800), []);

  // Get forecast
  const getForecast = async (location: string) => {
    setForecastLoading(true);
    if (location) {
      const newForecast = await client.getForecast(location);
      if (newForecast != null) {
        setForecast(newForecast);
      }
    }
    setForecastLoading(false);
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
            gap: 5,
            width: "inherit",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography component="h1" variant="h4">
              <b>Weather</b>
              <Typography fontSize={15} color={blue[800]}>
                <b>
                  by{" "}
                  <a
                    href="https://adrianhong.dev/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "inherit" }}
                  >
                    Adrian Hong
                  </a>
                </b>
              </Typography>
            </Typography>
            <Typography component="h2" fontSize={13}>
              <i>Find out whether the weather is wet there!</i>
            </Typography>
          </Box>
          <Autocomplete
            sx={{ width: "inherit" }}
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
            onInputChange={(event: SyntheticEvent, newInputValue: string) => {
              setAutocompleteLoading(true);
              onChangeHandler(newInputValue);
            }}
            freeSolo
            loading={autocompleteLoading}
          />
          <WeatherDisplay forecast={forecast} loading={forecastLoading} />
        </Box>
      </Container>
    </>
  );
};

export default Main;
