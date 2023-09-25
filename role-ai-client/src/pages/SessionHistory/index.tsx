import { Box, Grid, Typography } from "@mui/material";
import { useSessionHistory } from "../../hooks/useSessionHisotry";
import { CharacterSessions } from "../../components/sessionHistory/CharacterSessions";
import { Character } from "../../common/model";
import { observer } from "mobx-react-lite";
import { Colors, Margin, Padding } from "../../common/styles";

export const SessionHistory = observer(() => {
  const { characters, charactersProgressState } = useSessionHistory();

  return (
    <Grid container justifyContent="center" display="flex">
      <Grid
        item
        xs={7}
        justifyContent="center"
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        sx={{
          // padding: Padding.P18,
          marginTop: Margin.M24,
          marginBottom: Margin.M24,
        }}
      >
        <Typography variant="h4">Characters & your session details</Typography>
        <Typography variant="subtitle1" sx={{ color: Colors.Dark.N500 }}>
          Here you can see a list of characters that you've had sessions with,
          back to back with conversation details
        </Typography>
      </Grid>
      {charactersProgressState.state === "SUCCESS" &&
        characters &&
        characters.length &&
        characters.map((character: Character) => (
          <Grid key={character.id} xs={7} sx={{ marginBottom: Margin.M12 }}>
            <CharacterSessions character={character} />
          </Grid>
        ))}
    </Grid>
  );
});
