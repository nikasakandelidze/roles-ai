import { useEffect } from "react";
import { sessionStore } from "../state/sessions";
import { ActionProgress } from "../state/user";

export const useSessionHistory = () => {
  const progressState: ActionProgress =
    sessionStore.fetchSessionHistoryProgressState;
  useEffect(() => {
    sessionStore.fetchSessionHistory();
  }, []);

  return {
    history: sessionStore.sessionHistory,
    progressState,
  };
};
