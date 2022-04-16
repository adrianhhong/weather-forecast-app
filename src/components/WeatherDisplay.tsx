import { Grid, Box, CircularProgress } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ForecastBody } from "../client/types";
import FutureForecast from "./FutureForecast";
import TodayWeather from "./TodayWeather";

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
                background: `linear-gradient(${blue[400]}, ${blue[700]})`,
                borderRadius: "25px",
                color: grey[50],
                gap: 0.5,
                boxShadow: 10,
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
                <TodayWeather forecast={forecast} />
              </Box>
            </Grid>
            <Grid
              item
              justifyContent="space-around"
              xs={12}
              marginBottom={5}
              sx={{
                background: `linear-gradient(${blue[700]}, ${blue[400]})`,
                borderRadius: "25px",
                color: grey[50],
                boxShadow: 10,
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
