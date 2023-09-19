import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { BorderRadius, Colors, Padding } from "../../common/styles";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useSetupWebsocketConnection } from "../../hooks/useWebsocket";
import { Chat } from "../../common/model";
import { sessionStore } from "../../state/sessions";
import { useLocation, useParams } from "react-router-dom";
import { userStore } from "../../state/user";
import { ChatCard } from "../../components/session/ChatCard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SessionHistory } from "../../components/session/SessionHistory";

// What about introducing custom hooks instead of polluting UI code with logic and state management?
export const Session = observer(() => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const skipFetch: string | null = queryParams.get("skip_fetch");
  const { id } = useParams();

  const [focused, setFocused] = useState(false);

  const [input, setInput] = useState("");
  const [tryToSend, setTryToSend] = useState(false);

  const chats: Chat[] | undefined = sessionStore.session?.chat;
  const aiResponseInProgress: boolean | undefined =
    chats &&
    chats.find(
      (chat: Chat) => chat.id === "BOT_OUTPUT_MOCK_ID_TO_BE_UPDATED",
    ) !== undefined;

  const { send } = useSetupWebsocketConnection(
    (message) => {
      sessionStore.updateBotChatOutput(message);
    },
    (chat: Chat) => {
      sessionStore.updateLatestChatOfUser(chat);
    },
    (chat: Chat) => {
      sessionStore.finishBotOutputUpdate(chat);
    },
  );

  useEffect(() => {
    if (tryToSend && sessionStore.session && userStore.user && input) {
      send({
        userId: userStore.user.id,
        sessionId: sessionStore.session.id,
        chat: { content: input },
      });
      setTryToSend(false);
      setInput("");
    }
  }, [tryToSend, sessionStore.session, userStore.user]);

  useEffect(() => {
    if (!skipFetch && userStore.user) {
      id && sessionStore.fetchSession(id);
    }
  }, [userStore.user]);

  useEffect(() => {
    if (userStore.user) {
      sessionStore.fetchSessionHistory();
    }
  }, [userStore.user]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      sx={{ overflowY: "hidden" }}
    >
      <Grid
        container
        flex={1}
        sx={{ backgroundColor: Colors.Light.N20 }}
        justifyContent="center"
      >
        <Grid item xs={2} sx={{ padding: Padding.P6 }}></Grid>
        <Grid
          item
          container
          alignItems="baseline"
          xs={8}
          spacing={2}
          sx={{
            overflowY: "scroll",
            maxHeight: "79vh",
            paddingLeft: Padding.P24,
            paddingRight: Padding.P24,
            paddingTop: Padding.P24,
            paddingBottom: Padding.P40,
          }}
        >
          {chats &&
            chats.map((chat: Chat) => (
              <Grid
                key={chat.id}
                item
                xs={12}
                sx={{ width: "100%", display: "flex" }}
                justifyContent={chat.isBot ? "flex-start" : "flex-end"}
              >
                <ChatCard
                  chat={chat}
                  facingDirection={chat.isBot ? "left" : "right"}
                />
              </Grid>
            ))}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      {aiResponseInProgress && <LinearProgress />}
      <Box
        sx={{
          padding: Padding.P24,
          paddingBottom: Padding.P40,
          borderTop: `1px solid ${Colors.Light.N30}`,
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={6} position="relative">
            <TextField
              value={input}
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && focused && !aiResponseInProgress) {
                  setTryToSend(true);
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      disabled={aiResponseInProgress}
                      onClick={() => {
                        setTryToSend(true);
                      }}
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
                      {aiResponseInProgress ? (
                        <MoreHorizIcon fontSize="medium" />
                      ) : (
                        <SendIcon fontSize="medium" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});
