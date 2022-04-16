import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { ForecastBody } from "../client/types";

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
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ backgroundColor: "#e8eaf6", borderRadius: "25px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
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
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
            <Grid item xs={12}>
              <Typography variant="body2">
                {forecast?.current?.last_updated_epoch != null &&
                  `${new Date(
                    forecast?.current?.last_updated_epoch * 1000
                  ).toLocaleString("en", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}`}
              </Typography>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};

export default WeatherDisplay;
