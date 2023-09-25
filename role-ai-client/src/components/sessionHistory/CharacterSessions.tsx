import {
  Accordion,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { Character, Session } from "../../common/model";
import { BorderRadius, Colors, Margin, Padding } from "../../common/styles";
import { CharacterSession } from "./CharacterSession";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export const CharacterSessions = ({ character }: { character: Character }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        borderRadius: BorderRadius.B4,
        padding: Padding.P24,
        border: `1px solid ${Colors.Light.N40}`,
      }}
    >
      <Typography variant="h6" sx={{ color: Colors.Dark.N800 }}>
        {character.name}
      </Typography>
      <Divider
        sx={{
          opacity: 0.3,
          width: "70%",
          marginBottom: Margin.M12,
          marginTop: Margin.M8,
        }}
      />
      <Typography
        variant="subtitle1"
        sx={{ color: Colors.Dark.N600, marginBottom: Margin.M4 }}
      >
        {character.context}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: Colors.Dark.N600, marginBottom: Margin.M8 }}
      >
        {character.audience}
      </Typography>

      <Accordion
        sx={{
          backgroundColor: "white",
          boxShadow: 0,
          transition: "ease-in-out 0.1s",
          "&:hover": {
            background: `linear-gradient(to left top, white, ${Colors.Light.N20})`,
          },
          border: `1px solid ${Colors.Light.N30}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: Colors.Blue.B300 }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle1" sx={{ color: Colors.Blue.B300 }}>
            Sessions with this character
          </Typography>
        </AccordionSummary>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ padding: Padding.P12 }}
        >
          {character.sessions?.map((session: Session) => (
            <Box sx={{ marginBottom: Margin.M8 }}>
              <CharacterSession session={session} />
            </Box>
          ))}
        </Box>
      </Accordion>
    </Box>
  );
};
