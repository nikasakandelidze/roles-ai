import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Colors } from "../../common/styles";
import { observer } from "mobx-react-lite";
import { userStore } from "../../state/user";
import { useState } from "react";

export const Navigation = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Toolbar variant="regular">
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: Colors.Dark.N700 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: Colors.Dark.N700, flexGrow: 1 }}
          >
            Characters.ai
          </Typography>
          {userStore.user && (
            <Avatar
              onClick={(e) => handleClick(e)}
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "ease-in-out 0.2s",
              }}
            />
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                userStore.resetUser();
                handleClose();
              }}
            >
              Sign out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
});
