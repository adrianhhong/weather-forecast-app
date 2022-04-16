import { Box, Grid, Typography } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { ForecastBody, Forecastday } from "../client/types";

interface FutureForecastProps {
  forecast: ForecastBody | null;
}

const FutureForecast = ({ forecast }: FutureForecastProps): JSX.Element => {
  return (
    <>
      <Typography component="h2" fontSize={20} marginBottom={2}>
        <b>Weekly Forecast</b>
      </Typography>
      <Grid container justifyContent="center" gap={2}>
        {forecast?.forecast?.forecastday?.map((forecastDay: Forecastday) => {
          return (
            <Grid
              item
              xs={12}
              sx={{
                background: `linear-gradient(${deepPurple[400]}, ${deepPurple[300]})`,
                borderRadius: "25px",
                color: grey[50],
              }}
            >
              <Box
                sx={{
                  m: 2,
                }}
              >
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography component="h4" fontSize={15}>
                      <b>
                        {forecastDay?.date_epoch != null &&
                          `${new Date(
                            forecastDay?.date_epoch * 1000
                          ).toLocaleString("en-AU", {
                            weekday: "long",
                          })}`}
                      </b>
                    </Typography>
                    <Typography component="h4" fontSize={15}>
                      {forecastDay?.date_epoch != null &&
                        `${new Date(
                          forecastDay?.date_epoch * 1000
                        ).toLocaleString("en-AU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container wrap="nowrap" alignItems="center">
                      <Typography component="h4" fontSize={15} marginRight={2}>
                        <b>
                          {forecastDay?.day?.avgtemp_c != null &&
                            `${forecastDay?.day?.avgtemp_c}°C`}
                        </b>
                      </Typography>
                      {forecastDay?.day?.condition != null && (
                        <img
                          src={forecastDay?.day?.condition?.icon}
                          alt={forecastDay?.day?.condition?.text}
                          width="50"
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default FutureForecast;
