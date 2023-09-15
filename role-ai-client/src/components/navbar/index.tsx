import { AppBar, IconButton, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Colors } from "../../common/styles";

export const Navigation = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: 0,
          backgroundColor: "#F5F8FA",
          borderBottom: "1px solid #e6eaed",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: Colors.Dark.N700 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: Colors.Dark.N700 }}
          >
            Characters.ai
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
