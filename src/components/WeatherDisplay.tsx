import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { ForecastBody, Forecastday } from "../client/types";
import FutureForecast from "./FutureForecast";

interface WeatherDisplayProps {
  forecast: ForecastBody | null;
  loading: boolean;
}

const WeatherDisplay = ({
  forecast,
  loading,
}: WeatherDisplayProps): JSX.Element => {
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        forecast && (
          <Grid container gap={3}>
            <Grid
              item
              xs={12}
              sx={{
                background: `linear-gradient(${deepPurple[400]}, ${deepPurple[700]})`,
                borderRadius: "25px",
                color: grey[50],
                gap: 0.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  m: 3,
                }}
              >
                <Typography component="h3" variant="body1">
                  {forecast?.current?.last_updated_epoch != null &&
                    `${new Date(
                      forecast?.current?.last_updated_epoch * 1000
                    ).toLocaleString("en-AU", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "numeric",
                      minute: "numeric",
                    })}`}
                </Typography>
                {forecast?.current?.condition != null && (
                  <img
                    src={forecast?.current?.condition?.icon}
                    alt={forecast?.current?.condition?.text}
                    width="50"
                  />
                )}
                <Typography component="h4" fontSize={20}>
                  {forecast?.current?.condition?.text != null &&
                    `${forecast?.current?.condition?.text}`}
                </Typography>
                <Typography component="h3" fontSize={100}>
                  {forecast?.current?.temp_c != null &&
                    `${forecast?.current?.temp_c}°C`}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              justifyContent="space-around"
              xs={12}
              marginBottom={5}
              sx={{
                background: `linear-gradient(${deepPurple[400]}, ${deepPurple[700]})`,
                borderRadius: "25px",
                color: grey[50],
              }}
            >
              <Box
                sx={{
                  m: 3,
                }}
              >
                <FutureForecast forecast={forecast} />
              </Box>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};

export default WeatherDisplay;
