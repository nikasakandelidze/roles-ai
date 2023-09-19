import { Box, Divider, Typography } from "@mui/material";
import { Chat } from "../../common/model";
import { BorderRadius, Colors, Margin, Padding } from "../../common/styles";
import { observer } from "mobx-react-lite";

export type FacingDirection = "left" | "right";

export const ChatCard = observer(
  ({
    chat,
    facingDirection = "left",
  }: {
    chat: Chat;
    facingDirection?: FacingDirection;
  }) => {
    return (
      <Box
        sx={{
          maxWidth: "600px",
          minWidth: "150px",
          backgroundColor: Colors.Light.N0,
          boxShadow: 2,
          padding: Padding.P18,
          borderRadius: BorderRadius.B16,
          borderTopLeftRadius:
            facingDirection === "left" ? 0 : BorderRadius.B16,
          borderTopRightRadius:
            facingDirection === "right" ? 0 : BorderRadius.B16,
        }}
      >
        <Typography variant="subtitle1" color={Colors.Dark.N500}>
          {!chat.isBot ? "You" : "Bot"}
        </Typography>
        <Divider sx={{ opacity: 0.2, marginBottom: Margin.M12 }} />
        <Typography variant="body1" sx={{ color: Colors.Dark.N900 }}>
          {chat.content}
        </Typography>
      </Box>
    );
  },
);
