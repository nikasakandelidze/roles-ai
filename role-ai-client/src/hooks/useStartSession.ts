import { useEffect, useState } from "react";
import { sessionStore } from "../state/sessions";

export const useStartSession = () => {
  const [characterId, setCharacterId] = useState("");

  useEffect(() => {
    if (characterId) {
      sessionStore.startNewSession(characterId);
      setCharacterId("");
    }
  }, [characterId]);

  return {
    setCharacterId,
  };
};
