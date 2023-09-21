import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Colors, Margin } from "../../common/styles";
import { observer } from "mobx-react-lite";
import { userStore } from "../../state/user";
import { useMenuAnchor } from "../../hooks/useMenuAnchor";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export const Navigation = observer(() => {
  const { anchorEl, open, handleClick, handleClose } = useMenuAnchor();

  const navigate = useNavigate();

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
            onClick={() => {
              navigate("/home");
            }}
            variant="h6"
            component="div"
            sx={{
              color: Colors.Dark.N700,
              flexGrow: 1,
              cursor: "pointer",
              "&:hover": { color: Colors.Primary.Pacific },
            }}
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
              <LogoutIcon sx={{ marginLeft: Margin.M8 }} />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
});
