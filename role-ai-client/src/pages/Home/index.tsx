import { observer } from "mobx-react-lite";
import { userStore } from "../../state/user";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { BorderRadius } from "../../common/styles";

export type HomePageType = "home" | "create_character";

const HomePage = ({ togglePage }: { togglePage: () => void }) => {
  return (
    <Grid columnSpacing={{ xs: 2 }}>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={{ borderRadius: BorderRadius.B8 }}
          onClick={() => togglePage()}
        >
          <AddIcon />
          Add Character
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Typography variant="h4">No Characters present yet</Typography>
      </Grid>
    </Grid>
  );
};

const CreatePage = () => {
  return <Box>Create Page</Box>;
};

export const Home = observer(() => {
  const [currentPage, setCurrentPage] = useState<HomePageType>("home");

  const togglePage = () => {
    setCurrentPage((prev) => (prev === "home" ? "create_character" : "home"));
  };

  // Below minHeight was chosen by trial and error process of trying different height percentages if not applicable please update or remove
  return (
    <Grid style={{ width: "100%" }}>
      <Grid item xs={12}>
        {!userStore.user ? (
          currentPage === "home" ? (
            <HomePage togglePage={() => togglePage()} />
          ) : (
            <CreatePage />
          )
        ) : (
          <Typography variant="h4">Please login to use this page 😉</Typography>
        )}
      </Grid>
    </Grid>
  );
});
