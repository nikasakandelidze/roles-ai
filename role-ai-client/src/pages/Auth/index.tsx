import { Grid } from "@mui/material";
import { AuthCard } from "./AuthCard";

export const Auth = () => {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Grid alignItems={"center"} item xs={8} sx={{ height: "100%" }}>
        <AuthCard />
      </Grid>
    </Grid>
  );
};
