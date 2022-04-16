import { Grid, Typography } from "@mui/material";
import { ForecastBody } from "../client/types";

interface TodayWeatherProps {
  forecast: ForecastBody | null;
}

const TodayWeather = ({ forecast }: TodayWeatherProps): JSX.Element => {
  return (
    <>
      <Grid container alignItems="space-between">
        <Grid item xs={6}>
          <Typography component="h2" fontSize={20}>
            <b>Now</b>
          </Typography>
          <Typography component="h3" variant="body1">
            {forecast?.current?.last_updated_epoch != null &&
              `${new Date(
                forecast?.current?.last_updated_epoch * 1000
              ).toLocaleString("en-AU", {
                weekday: "short",
                day: "numeric",
                month: "long",
                hour: "numeric",
                minute: "numeric",
              })}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            wrap="nowrap"
            alignItems="center"
            justifyContent="flex-end"
          >
            {forecast?.current?.condition != null && (
              <img
                src={forecast?.current?.condition?.icon}
                alt={forecast?.current?.condition?.text}
                width="60"
              />
            )}
            <Typography component="h4" fontSize={18}>
              {forecast?.current?.condition?.text != null &&
                `${forecast?.current?.condition?.text}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Typography component="h3" fontSize={50}>
        {forecast?.current?.temp_c != null && `${forecast?.current?.temp_c}°C`}
      </Typography>
    </>
  );
};

export default TodayWeather;
