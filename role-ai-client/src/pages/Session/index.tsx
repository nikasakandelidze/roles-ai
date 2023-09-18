import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

// What about introducing custom hooks instead of polluting UI code with logic and state management?
export const Session = observer(() => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const characterId: string | null = queryParams.get("characterId");

  return <div>Session: {characterId}</div>;
});
