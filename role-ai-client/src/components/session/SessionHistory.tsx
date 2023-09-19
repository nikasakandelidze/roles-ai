import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { sessionStore } from "../../state/sessions";
import { Session } from "../../common/model";
import { BorderRadius, Colors, Margin, Padding } from "../../common/styles";
import ChatIcon from "@mui/icons-material/Chat";

export const SessionHistory = observer(() => {
  return (
    <Grid
      container
      sx={{
        overflowY: "scroll",
        justifyContent: "center",
        height: "100%",
        backgroundColor: Colors.Dark.N500,
        borderRadius: BorderRadius.B8,
        padding: Padding.P12,
        maxHeight: "80vh",
      }}
    >
      <Typography variant="subtitle1" sx={{ color: Colors.Light.N0 }}>
        Previous sessions
      </Typography>
      <Divider sx={{ color: Colors.Light.N10, width: "100%" }} />
      {sessionStore.fetchSessionHistoryProgressState.state ===
        "IN_PROGRESS" && <CircularProgress />}
      {sessionStore.sessionHistory.map((session: Session) => (
        <Grid
          item
          xs={12}
          key={session.id}
          display="flex"
          sx={{
            backgroundColor: Colors.Mid.N400,
            borderRadius: BorderRadius.B4,
            marginBottom: Margin.M8,
            border: `1px solid ${Colors.Mid.N400}`,
            cursor: "pointer",
            "&:hover": {
              border: `1px solid ${Colors.Light.N50}`,
            },
            transition: "ease-in-out 0.1s",
          }}
          alignItems="center"
          justifyContent="flex-start"
        >
          <ChatIcon
            sx={{
              color: Colors.Light.N0,
              marginRight: Margin.M8,
              marginLeft: Margin.M4,
            }}
          />
          <Typography variant="subtitle1" sx={{ color: Colors.Light.N0 }}>
            {session.character.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
});
