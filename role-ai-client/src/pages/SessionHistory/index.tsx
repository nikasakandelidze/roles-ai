import { Grid } from "@mui/material";
import { useSessionHistory } from "../../hooks/useSessionHisotry";

export const SessionHistory = () => {
  const { history, progressState } = useSessionHistory();
  return <Grid container>Session history</Grid>;
};
