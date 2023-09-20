import { Grid, Typography } from "@mui/material";
import { Colors } from "../../common/styles";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ backgroundColor: Colors.Light.N10 }}>
      <Grid
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h3">This page doesn't exist</Typography>
        <Typography
          onClick={() => navigate("/home")}
          variant="h3"
          sx={{
            color: Colors.Primary.Pacific,
            "&:hover": { textDecoration: "underline" },
            cursor: "pointer",
          }}
        >
          Go to the home page
        </Typography>
        <img src="https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif" />
      </Grid>
    </Grid>
  );
};
