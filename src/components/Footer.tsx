import { Link, Paper, Typography } from "@mui/material";

const Footer = (): JSX.Element => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <Typography variant="body2" color="text.secondary" align="center" mt="5">
        {"Made by "}
        <Link color="inherit" href="https://adrianhong.dev/" target="_blank">
          Adrian Hong
        </Link>
        {", "}
        {new Date().getFullYear()}
      </Typography>
    </Paper>
  );
};

export default Footer;
