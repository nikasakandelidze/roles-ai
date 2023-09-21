import { Grid } from "@mui/material";
import { Colors, Padding } from "../../common/styles";
import { Chat } from "../../common/model";
import { ChatCard } from "./ChatCard";

export const SessionChat = ({ chats }: { chats: Chat[] }) => {
  return (
    <Grid
      container
      flex={1}
      sx={{ backgroundColor: Colors.Light.N20 }}
      justifyContent="center"
    >
      <Grid item xs={2} sx={{ padding: Padding.P6 }}></Grid>
      <Grid
        item
        container
        alignItems="baseline"
        xs={8}
        spacing={2}
        sx={{
          overflowY: "scroll",
          maxHeight: "77vh",
          paddingLeft: Padding.P24,
          paddingRight: Padding.P24,
          paddingTop: Padding.P24,
          paddingBottom: Padding.P40,
        }}
      >
        {chats &&
          chats.map((chat: Chat) => (
            <Grid
              key={chat.id}
              item
              xs={12}
              sx={{ width: "100%", display: "flex" }}
              justifyContent={chat.isBot ? "flex-start" : "flex-end"}
            >
              <ChatCard
                chat={chat}
                facingDirection={chat.isBot ? "left" : "right"}
              />
            </Grid>
          ))}
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};
