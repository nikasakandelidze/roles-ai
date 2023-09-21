import { Box, LinearProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Colors, Margin, Padding } from "../../common/styles";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../../common/model";
import { sessionStore } from "../../state/sessions";
import { userStore } from "../../state/user";
import { SessionInput } from "../../components/session/SessionInput";
import { SessionChat } from "../../components/session/SessionChat";
import { usePageParams } from "../../hooks/useUrlParams";
import { useSessionWebSockets } from "./helpers/useSessionWebSockets";
import { Suggestions } from "../../components/session/Suggestions";

// What about introducing custom hooks instead of polluting UI code with logic and state management?
export const Session = observer(() => {
  const { queryParam: skipFetch, pathParam: id } = usePageParams(
    "skip_fetch",
    "id",
  );
  const [input, setInput] = useState("");
  const [tryToSend, setTryToSend] = useState(false);
  const inputRef = useRef<any>(null);

  const chats: Chat[] | undefined = sessionStore.session?.chat;
  const aiResponseInProgress: boolean | undefined =
    chats &&
    chats.find(
      (chat: Chat) => chat.id === "BOT_OUTPUT_MOCK_ID_TO_BE_UPDATED",
    ) !== undefined;

  const { send } = useSessionWebSockets();

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
    inputRef?.current?.focus();
  }, []);

  const showSuggestions = (sessionStore?.session?.chat?.length || 0) <= 1;

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
          display: "flex",
          flexDirection: "column",
          padding: showSuggestions ? 0 : Padding.P40,
          paddingBottom: Padding.P40,
          borderTop: `1px solid ${Colors.Light.N30}`,
          alignItems: "center",
        }}
      >
        <Suggestions
          sx={{ marginBottom: Margin.M16, marginTop: Margin.M16 }}
          setSuggestion={(data) => {
            setInput(data);
            inputRef?.current?.focus();
          }}
          show={showSuggestions} // Here setting 0 since if there is no chat length then let's show suggestions
        />
        <SessionInput
          inputRef={inputRef}
          setTryToSend={setTryToSend}
          input={input}
          setInput={setInput}
          disable={Boolean(aiResponseInProgress)}
        />
      </Box>
    </Box>
  );
});
