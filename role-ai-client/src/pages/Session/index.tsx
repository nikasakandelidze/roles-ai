import { Box, LinearProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Colors, Padding } from "../../common/styles";
import { useEffect, useState } from "react";
import { useSetupWebsocketConnection } from "../../hooks/useWebsocket";
import { Chat } from "../../common/model";
import { sessionStore } from "../../state/sessions";
import { useLocation, useParams } from "react-router-dom";
import { userStore } from "../../state/user";
import { SessionInput } from "../../components/session/SessionInput";
import { SessionChat } from "../../components/session/SessionChat";

// What about introducing custom hooks instead of polluting UI code with logic and state management?
export const Session = observer(() => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const skipFetch: string | null = queryParams.get("skip_fetch");
  const { id } = useParams();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryToSend, sessionStore.session, userStore.user, input, send]);

  useEffect(() => {
    if (!skipFetch && userStore.user) {
      id && sessionStore.fetchSession(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.user, id, skipFetch]);

  useEffect(() => {
    if (userStore.user) {
      sessionStore.fetchSessionHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.user]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      sx={{ overflowY: "hidden" }}
    >
      {chats && <SessionChat chats={chats} />}
      {aiResponseInProgress && <LinearProgress />}
      <Box
        sx={{
          padding: Padding.P24,
          paddingBottom: Padding.P40,
          borderTop: `1px solid ${Colors.Light.N30}`,
        }}
      >
        <SessionInput
          setTryToSend={setTryToSend}
          input={input}
          setInput={setInput}
          disable={Boolean(aiResponseInProgress)}
        />
      </Box>
    </Box>
  );
});
