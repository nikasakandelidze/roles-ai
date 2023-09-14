import { useEffect, useState } from "react";
import { socket } from "../common/socket";

export const useWebSocketConnection = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return { isConnected };
};

export const useWebSocketHandler = ({
  promptResponseHandler,
}: {
  promptResponseHandler: (content: string) => void;
}) => {
  const [promptHandlerActive, setPromptHandlerActive] = useState(false);

  const sendPrompt = (content: string) => {
    socket.emit("prompt", JSON.stringify({ prompt: content }));
  };

  useEffect(() => {
    socket.on("prompt", promptResponseHandler);
    setPromptHandlerActive(true);
    return () => {
      socket.off("prompt", () => setPromptHandlerActive(false));
    };
  }, []);

  return { promptHandlerActive, setPromptHandlerActive, sendPrompt };
};
