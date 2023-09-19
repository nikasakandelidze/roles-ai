import { useEffect } from "react";
import { socketService } from "../common/socket";
import { sessionStore } from "../state/sessions";
import { Chat, ChatMessageInput } from "../common/model";

export const useSetupWebsocketConnection = (
  botChatOutputHandler?: (text: string) => void,
  latestUserChatUpdateHandler?: (chat: Chat) => void,
  botChatOutputFinishedHandler?: (chat: Chat) => void,
) => {
  useEffect(() => {
    socketService.connect(
      botChatOutputHandler,
      latestUserChatUpdateHandler,
      botChatOutputFinishedHandler,
    );
    return () => {
      socketService.disconnect();
    };
  }, []);

  const send = (message: ChatMessageInput) => {
    sessionStore.sendMessage(message);
  };

  return { send };
};
