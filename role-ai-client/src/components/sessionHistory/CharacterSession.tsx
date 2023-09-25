import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Session } from "../../common/model";
import { BorderRadius, Colors, Margin, Padding } from "../../common/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const CharacterSession = observer(
  ({ session }: { session: Session }) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: Colors.Light.N0,
          borderRadius: BorderRadius.B8,
          padding: Padding.P8,
          overflow: "auto",
          overflowWrap: "break-word",
          border: `1px solid ${Colors.Light.N20}`,
          cursor: "pointer",
          transition: "ease-in-out 0.1s",
          "&:hover": {
            border: `1px solid ${Colors.Light.N50}`,
          },
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            Session Date: {session.createdAt?.toString()}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              transition: "ease-in-out 0.1s",
              "&:hover": {
                textDecoration: "underline",
                color: Colors.Blue.B300,
              },
            }}
          >
            <Typography>Go to session</Typography>
            <OpenInNewIcon />
          </Box>
        </Box>
        <Divider
          sx={{ opacity: 0.1, marginTop: Margin.M8, marginBottom: Margin.M12 }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Topics discussed</Typography>
          </Grid>
          {session.discussionTopics?.map((data) => (
            <Grid item>
              <Chip label={data.topic} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  },
);
