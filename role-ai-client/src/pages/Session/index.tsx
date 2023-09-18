import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { BorderRadius, Colors, Padding } from "../../common/styles";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useSetupWebsocketConnection } from "../../hooks/useWebsocket";
import { Chat } from "../../common/model";
import { sessionStore } from "../../state/sessions";

// What about introducing custom hooks instead of polluting UI code with logic and state management?
export const Session = observer(() => {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const characterId: string | null = queryParams.get("characterId");

  const [focused, setFocused] = useState(false);

  const [input, setInput] = useState("");

  const chats: Chat[] | undefined = sessionStore.session?.chat;

  useSetupWebsocketConnection();

  return (
    <Grid container sx={{}}>
      <Grid item xs={12} sx={{ height: "100%" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="flex-end"
          spacing={5}
          sx={{ height: "100%" }}
        >
          <Grid item xs={12} flex="1">
            <Box>{chats && chats.map((e: Chat) => <Box>{e.content}</Box>)}</Box>
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              variant="outlined"
              placeholder="Send a message"
              sx={{
                display: "flex",
                flex: 1,
                borderRadius: BorderRadius.B8,
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                "& fieldset": { border: "none" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      edge="end"
                      sx={{
                        paddingLeft: Padding.P12,
                        paddingRight: Padding.P12,
                        paddingTop: Padding.P12,
                        paddingBottom: Padding.P12,
                        backgroundColor:
                          input.length > 0 ? Colors.Green.G300 : "inherit",
                        color:
                          input.length > 0 ? Colors.Light.N0 : Colors.Dark.N700,
                        transition: "ease-in-out 0.1s",
                        borderRadius: BorderRadius.B16,
                      }}
                    >
                      <SendIcon fontSize="medium" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
