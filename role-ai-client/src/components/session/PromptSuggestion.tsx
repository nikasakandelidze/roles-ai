import { Box, Typography } from "@mui/material";
import { BorderRadius, Colors, Padding } from "../../common/styles";

export const PromptSuggestion = ({
  suggestion,
  setSuggestion,
}: {
  suggestion: string;
  setSuggestion?: (content: string) => void;
}) => {
  return (
    <Box
      onClick={() => setSuggestion && setSuggestion(suggestion)}
      sx={{
        display: "flex",
        backgroundColor: Colors.Light.N0,
        border: `1px solid ${Colors.Light.N40}`,
        borderRadius: BorderRadius.B8,
        padding: Padding.P12,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "ease-in-out 0.1s",
        "&:hover": {
          backgroundColor: Colors.Light.N20,
          border: `1px solid ${Colors.Light.N50}`,
        },
      }}
    >
      <Typography variant="subtitle2" sx={{ color: Colors.Dark.N700 }}>
        {suggestion}
      </Typography>
    </Box>
  );
};
