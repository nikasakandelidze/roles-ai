import { Box, Grid, Typography } from "@mui/material";
import { AuthCard } from "./AuthCard";
import { observer } from "mobx-react-lite";
import { userStore } from "../../state/user";
import { Colors } from "../../common/styles";
import { useNavigate } from "react-router-dom";

export const Auth = observer(() => {
  const navigate = useNavigate();

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
        {userStore.user ? (
          <>
            <Typography variant="h4">You are already logged in 🧐 </Typography>
            <Box
              onClick={() => {
                navigate("/home");
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  "&:hover": { textDecoration: "underline" },
                  color: Colors.Primary.Pacific,
                  cursor: "pointer",
                }}
              >
                Go to home page{" "}
              </Typography>
            </Box>
          </>
        ) : (
          <AuthCard />
        )}
      </Grid>
    </Grid>
  );
});
