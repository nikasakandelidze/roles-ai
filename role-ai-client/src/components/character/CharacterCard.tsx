import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Character } from "../../common/model";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { BorderRadius, Colors } from "../../common/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const CharacterCard = ({
  character,
  setCharacterId,
}: {
  character: Character;
  setCharacterId?: (id: string) => void;
}) => {
  return (
    <Card sx={{ borderRadius: BorderRadius.B16 }}>
      <CardHeader title={character.name} subheader={character.name} />
      <CardContent sx={{ overflow: "hidden", overflowWrap: "break-word" }}>
        <Typography variant="body1">
          {character.context.slice(0, 100)}
          {character.context.length > 100 && "....."}
        </Typography>
      </CardContent>
      <Divider sx={{ width: " 100%", opacity: 0.2 }} />
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          display="flex"
          alignItems="center"
          variant="subtitle1"
          sx={{
            color: Colors.Dark.N700,
            fontWeight: "400",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
              color: Colors.Blue.B400,
            },
          }}
        >
          Your sessions
          <OpenInNewIcon fontSize="small" />
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setCharacterId && setCharacterId(character.id);
          }}
        >
          Start session
          <KeyboardArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
