import { useEffect } from "react";
import { sessionStore } from "../state/sessions";
import { charactersStore } from "../state/characters";

export const useSessionHistory = () => {
  // useEffect(() => {
  //   sessionStore.fetchSessionHistory();
  // }, []);

  useEffect(() => {
    charactersStore.fetchCharacterSessions();
  }, []);

  return {
    history: sessionStore.sessionHistory,
    sessionsHistoryProgressState: sessionStore.fetchSessionHistoryProgressState,
    characters: charactersStore.characters,
    charactersProgressState: charactersStore.charactersFilterProgress,
  };
};
