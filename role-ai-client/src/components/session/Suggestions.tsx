import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { PromptSuggestion } from "./PromptSuggestion";
import { sessionStore } from "../../state/sessions";

export const Suggestions = observer(
  ({
    setSuggestion,
    show = true,
    sx = {},
  }: {
    setSuggestion?: (content: string) => void;
    show?: boolean;
    sx?: object;
  }) => {
    return show ? (
      <Grid container display="flex" justifyContent="center" sx={sx}>
        <Grid item xs={6} container spacing={2}>
          {sessionStore.session?.character.suggestedPrompts &&
            sessionStore.session?.character.suggestedPrompts.array?.map(
              (e: { content: string }) => (
                <Grid key={e.content} item xs={6}>
                  <PromptSuggestion
                    suggestion={e.content}
                    setSuggestion={setSuggestion}
                  />
                </Grid>
              ),
            )}
        </Grid>
      </Grid>
    ) : null;
  },
);
