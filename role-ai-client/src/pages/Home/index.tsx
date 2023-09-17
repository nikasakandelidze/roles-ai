import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { BorderRadius, Colors, Margin, Padding } from "../../common/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { enqueueSnackbar } from "notistack";

import { userStore } from "../../state/user";
import { charactersStore } from "../../state/characters";
import { Character } from "../../common/model";
import { CharacterCard } from "../../components/character/CharacterCard";
import { useNavigate } from "react-router-dom";

export type HomePageType = "home" | "create_character";

const HomePage = observer(({ togglePage }: { togglePage: () => void }) => {
  useEffect(() => {
    charactersStore.filterCharacters();
  }, []);

  return (
    <Grid container columnSpacing={{ xs: 2, height: "100%" }}>
      <Grid
        minHeight="100px"
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          sx={{ borderRadius: BorderRadius.B8 }}
          onClick={() => togglePage()}
        >
          <AddIcon />
          Add Character
        </Button>
      </Grid>
      <Divider sx={{ width: "100%", opacity: 0.3, marginBottom: Margin.M68 }} />
      <Grid
        item
        container
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
      >
        {charactersStore.characters && charactersStore.characters.length ? (
          [
            <Grid
              key={"FIRST_ONE_TEXT_KEY"}
              item
              xs={12}
              display="flex"
              justifyContent="center"
            >
              <Typography variant="h4">
                AI Characters to choose from:
              </Typography>
            </Grid>,
            ...charactersStore.characters.map((character: Character) => {
              return (
                <Grid item xs={3} key={character.id}>
                  <CharacterCard character={character} />
                </Grid>
              );
            }),
          ]
        ) : (
          <>
            <Typography variant="h4">No Characters present yet🤓</Typography>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                togglePage();
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginLeft: Margin.M8,
                  textDecoration: "underline",
                  color: Colors.Blue.B400,
                  transition: "ease-in-out 0.1s",
                  "&:hover": {
                    color: Colors.Green.G400,
                    transform: "scale(1.05)",
                  },
                }}
              >
                Add one
              </Typography>
            </Box>
          </>
        )}
      </Grid>
    </Grid>
  );
});

const CreatePage = observer(({ togglePage }: { togglePage: () => void }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tryToCreate, setTryToCreate] = useState(false);

  useEffect(() => {
    if (tryToCreate) {
      if (name && description) {
        charactersStore.createCharacter({ name, context: description });
      } else {
        if (!name) {
          enqueueSnackbar("Character Name is mandatory", { variant: "info" });
        }
        if (!description) {
          enqueueSnackbar("Character Description is mandatory", {
            variant: "info",
          });
        }
      }
      setTryToCreate(false);
    }
  }, [tryToCreate]);

  useEffect(() => {
    if (charactersStore.characterCreationProgress.state === "FAILED") {
      enqueueSnackbar(charactersStore.characterCreationProgress.message, {
        variant: "error",
      });
      charactersStore.updateCharacterCreationProgressState("IDLE", null);
    } else if (charactersStore.characterCreationProgress.state === "SUCCESS") {
      enqueueSnackbar(charactersStore.characterCreationProgress.message, {
        variant: "info",
      });
      togglePage();
      charactersStore.updateCharacterCreationProgressState("IDLE", null);
      setDescription("");
      setName("");
    }
  }, [charactersStore.characterCreationProgress]);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={5}>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: Padding.P8,
            borderRadius: BorderRadius.B8,
          }}
        >
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flex="1"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Chip
                onClick={() => {
                  togglePage();
                }}
                icon={<ArrowBackIosIcon fontSize="small" />}
                label="Back"
                clickable
              />
            </Box>
            <Box
              display="flex"
              flex="8"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h5">
                Specify details of your next AI character
              </Typography>
              <Typography variant="body2">
                These details will be used upon interacting with this character
                through chat
              </Typography>
            </Box>
            <Box display="flex" flex="1"></Box>
          </Box>
          <Divider
            variant="middle"
            sx={{
              width: "60%",
              marginTop: Margin.M24,
              marginBottom: Margin.M24,
              opacity: 0.3,
            }}
          />
          <TextField
            placeholder="Name"
            variant="outlined"
            sx={{
              backgroundColor: Colors.Light.N0,
              width: "100%",
              marginBottom: Margin.M24,
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            placeholder="Describe your character"
            variant="outlined"
            minRows={"5"}
            maxRows={"10"}
            multiline
            sx={{
              backgroundColor: Colors.Light.N0,
              width: "100%",
              marginBottom: Margin.M24,
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            sx={{ marginBottom: Margin.M24 }}
          >
            {tryToCreate ? (
              <CircularProgress size="50px" />
            ) : (
              <Button
                variant="contained"
                sx={{ width: "70%", padding: Padding.P8 }}
                onClick={() => {
                  setTryToCreate(true);
                }}
              >
                Create
              </Button>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
});

export const Home = observer(() => {
  const [currentPage, setCurrentPage] = useState<HomePageType>("home");
  const navigate = useNavigate();

  const togglePage = () => {
    setCurrentPage((prev) => (prev === "home" ? "create_character" : "home"));
  };

  useEffect(() => {
    if (userStore.initialUserCheckStatus === "FINISHED" && !userStore.user) {
      navigate("/auth");
    }
  }, [userStore.initialUserCheckStatus, userStore.user]);

  return (
    <Grid style={{ width: "100%" }}>
      <Grid item xs={12}>
        {userStore.initialUserCheckStatus !== "FINISHED" ? (
          <CircularProgress size="80px" />
        ) : userStore.user ? (
          currentPage === "home" ? (
            <HomePage togglePage={() => togglePage()} />
          ) : (
            <CreatePage togglePage={() => togglePage()} />
          )
        ) : (
          <Typography variant="h4">Please login to use this page 😉</Typography>
        )}
      </Grid>
    </Grid>
  );
});
