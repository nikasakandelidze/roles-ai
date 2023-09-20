import { Chat } from "../../../common/model";
import { useSetupWebsocketConnection } from "../../../hooks/useWebsocket";
import {
  BOT_FINISH_CHAT_UPDATE,
  BOT_MESSAGE_TOPIC_OUTPUT,
  USER_LATEST_CHAT_UPDATE,
  sessionStore,
} from "../../../state/sessions";

export const useSessionWebSockets = () => {
  const { send } = useSetupWebsocketConnection([
    {
      topic: BOT_MESSAGE_TOPIC_OUTPUT,
      handler: (message: any) => {
        const msg: string = message as string;
        sessionStore.updateBotChatOutput(msg);
      },
    },
    {
      topic: USER_LATEST_CHAT_UPDATE,
      handler: (chat: Chat) => {
        sessionStore.updateLatestChatOfUser(chat);
      },
    },
    {
      topic: BOT_FINISH_CHAT_UPDATE,
      handler: (chat: Chat) => {
        sessionStore.finishBotOutputUpdate(chat);
      },
    },
  ]);
  return { send };
};
