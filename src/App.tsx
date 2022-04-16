import { CssBaseline } from "@mui/material";
import { blue, blueGrey, deepPurple, grey, indigo } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Main from "./views/Main";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    // secondary: {
    //   main: "#c5cae9",
    // },
    background: {
      default: deepPurple[100],
    },
    text: {
      primary: grey[800],
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
