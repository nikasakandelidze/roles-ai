import { useCallback, useEffect, useState } from "react";
import { sessionStore } from "../state/sessions";
import { ChatMessageInput } from "../common/model";
import { SocketListenerData, SocketService } from "../common/socket";

export const useSetupWebsocketConnection = (
  socketHandlerData: SocketListenerData[],
) => {
  const [socketService] = useState<SocketService>(new SocketService());

  useEffect(() => {
    if (socketService) {
      socketService.connect(socketHandlerData);
      return () => {
        socketService.disconnect();
      };
    }
  }, [socketService, socketHandlerData]);

  const send = useCallback(
    (message: ChatMessageInput) => {
      sessionStore.sendMessage(message, socketService);
    },
    [socketService],
  );

  return { send };
};
