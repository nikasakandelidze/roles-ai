import { useEffect } from "react";
import { socketService } from "../common/socket";
import { sessionStore } from "../state/sessions";

export const useSetupWebsocketConnection = (
  handler?: ((text: string) => void) | undefined,
) => {
  useEffect(() => {
    socketService.connect(handler);
    return () => {
      socketService.disconnect();
    };
  }, []);

  const send = (message: string) => {
    sessionStore.sendMessage(message);
  };

  return { send };
};
