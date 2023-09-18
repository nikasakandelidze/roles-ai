import { Grid } from "@mui/material";
import { AuthCard } from "./AuthCard";
import { observer } from "mobx-react-lite";

export const Auth = observer(() => {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        item
        xs={8}
        sx={{ height: "100%" }}
      >
        <AuthCard />
      </Grid>
    </Grid>
  );
});
