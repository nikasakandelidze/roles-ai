import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { BorderRadius, Colors, Margin, Padding } from "../../common/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { enqueueSnackbar } from "notistack";

import { userStore } from "../../state/user";
import { charactersStore } from "../../state/characters";
import { Character } from "../../common/model";
import { CharacterCard } from "../../components/character/CharacterCard";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useMenuAnchor } from "../../hooks/useMenuAnchor";
import { useStartSession } from "../../hooks/useStartSession";
import { sessionStore } from "../../state/sessions";
import { useNavigate } from "react-router-dom";

export type HomePageType = "home" | "create_character";

// What about introducing custom hooks instead of polluting UI code with logic and state management?
const HomePage = observer(({ togglePage }: { togglePage: () => void }) => {
  const { anchorEl, open, handleClick, handleClose } = useMenuAnchor();
  const { setCharacterId } = useStartSession();
  const navigate = useNavigate();

  // Why is sessionStore.session needed here? Why doesn't this effect work only with first argument?
  useEffect(() => {
    if (sessionStore.startSessionProgressState.state === "FAILED") {
      if (sessionStore.startSessionProgressState.message) {
        enqueueSnackbar(sessionStore.startSessionProgressState.message, {
          variant: "error",
        });
      }
      sessionStore.updateNewSessionProgressState("IDLE", null);
    } else if (sessionStore.startSessionProgressState.state === "SUCCESS") {
      if (sessionStore.startSessionProgressState.message) {
        enqueueSnackbar(sessionStore.startSessionProgressState.message, {
          variant: "success",
        });
      }
      sessionStore.updateNewSessionProgressState("IDLE", null);
      sessionStore.session &&
        navigate(
          `/session/${sessionStore.session.id}?${new URLSearchParams({
            skip_fetch: "skip",
          })}`,
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sessionStore.startSessionProgressState.state,
    sessionStore.session,
    navigate,
  ]);

  return (
    <Grid container columnSpacing={2}>
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
          sx={{ borderRadius: BorderRadius.B8, padding: Padding.P8 }}
          onClick={() => togglePage()}
        >
          <AddCircleIcon />
          Add Character
        </Button>
        <Divider
          orientation="vertical"
          sx={{
            height: "35%",
            marginLeft: Margin.M12,
            marginRight: Margin.M12,
            opacity: 0.5,
          }}
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: BorderRadius.B8,
            padding: Padding.P8,
            backgroundColor: Colors.Green.G300,
            "&:hover": {
              backgroundColor: Colors.Green.G500,
            },
          }}
          onClick={(e) => handleClick(e)}
        >
          <PlayCircleIcon />
          Start new Session
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {(charactersStore.charactersFilterProgress.state === "SUCCESS" ||
            charactersStore.charactersFilterProgress.state === "FAILED") &&
            (!charactersStore.characters ||
              !charactersStore.characters.length) && (
              <Typography variant="subtitle2">
                No characters present yet, please add one!
              </Typography>
            )}

          {charactersStore.characters &&
            charactersStore.characters.length &&
            charactersStore.characters.map((character: Character) => (
              <MenuItem
                key={character.id}
                onClick={() => {
                  setCharacterId(character.id);
                  handleClose();
                }}
              >
                <Typography variant="body2">{character.name}</Typography>
              </MenuItem>
            ))}
        </Menu>
      </Grid>
      <Divider sx={{ width: "100%", opacity: 0.3, marginBottom: Margin.M68 }} />
      <Grid
        item
        container
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        spacing={4}
      >
        {charactersStore.charactersFilterProgress.state === "SUCCESS" &&
          charactersStore.characters &&
          charactersStore.characters.length && [
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
                <Grid item xs={4} key={character.id}>
                  <CharacterCard
                    character={character}
                    setCharacterId={setCharacterId}
                  />
                </Grid>
              );
            }),
          ]}
        {charactersStore.charactersFilterProgress.state === "IN_PROGRESS" && (
          <CircularProgress size="70px" />
        )}
        {(charactersStore.charactersFilterProgress.state === "SUCCESS" ||
          charactersStore.charactersFilterProgress.state === "FAILED") &&
          (!charactersStore.characters ||
            !charactersStore.characters.length) && (
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

const INIT_DESCRIPTION = "Act as a ";
const INIT_AUDIENCE_DESCRIPTION = "Your audience is ";

const CreatePage = observer(({ togglePage }: { togglePage: () => void }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>(INIT_DESCRIPTION);
  const [audience, setAudience] = useState(INIT_AUDIENCE_DESCRIPTION);
  const [tryToCreate, setTryToCreate] = useState(false);

  const create = async () => {
    if (tryToCreate) {
      if (name && description && audience) {
        await charactersStore.createCharacter({
          name,
          context: description,
          audience,
        });
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
  };

  useEffect(() => {
    create();
  }, [tryToCreate, name, description, audience]);

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
      setAudience("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charactersStore.characterCreationProgress.state, togglePage]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Grid item xs={5}>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            value={description}
          />
          <TextField
            placeholder="Describe the audience of the chat"
            variant="outlined"
            minRows={"3"}
            maxRows={"10"}
            multiline
            sx={{
              backgroundColor: Colors.Light.N0,
              width: "100%",
              marginBottom: Margin.M24,
            }}
            onChange={(e) => setAudience(e.target.value)}
            value={audience}
          />
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            sx={{ marginBottom: Margin.M24 }}
          >
            {tryToCreate ? (
              <CircularProgress size="40px" />
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

  const togglePage = useCallback(() => {
    setCurrentPage((prev) => (prev === "home" ? "create_character" : "home"));
  }, []);

  useEffect(() => {
    if (userStore.user?.accessToken) {
      charactersStore.filterCharacters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.user?.accessToken]);

  return (
    <Grid style={{ width: "100%" }} container>
      <Grid item xs={12}>
        {userStore.initialUserCheckStatus !== "FINISHED" && (
          <CircularProgress size="80px" />
        )}
        {currentPage === "home" ? (
          <HomePage togglePage={togglePage} />
        ) : (
          <CreatePage togglePage={togglePage} />
        )}
      </Grid>
    </Grid>
  );
});
