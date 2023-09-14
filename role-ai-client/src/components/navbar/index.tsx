import { AppBar, IconButton, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

export const Navigation = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Characters.ai
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
