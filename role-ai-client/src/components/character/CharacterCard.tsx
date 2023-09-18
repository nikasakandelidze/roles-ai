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
import { Colors } from "../../common/styles";

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Card>
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
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
              color: Colors.Blue.B400,
            },
          }}
        >
          Learn More
        </Typography>
        <Button variant="outlined">
          Start session
          <KeyboardArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};