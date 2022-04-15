import { Grid, Typography } from "@mui/material";
import { ForecastBody } from "../client/types";

interface WeatherDisplayProps {
  forecast: ForecastBody;
}

const WeatherDisplay = ({ forecast }: WeatherDisplayProps): JSX.Element => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">
            {forecast?.current?.feelslike_c &&
              `Feels like: ${forecast?.current?.feelslike_c}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            {forecast?.current?.condition?.text &&
              `Feels like: ${forecast?.current?.condition?.text}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            {forecast?.current?.temp_c &&
              `Feels like: ${forecast?.current?.temp_c}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            {forecast?.current?.precip_mm &&
              `Feels like: ${forecast?.current?.precip_mm}`}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default WeatherDisplay;
