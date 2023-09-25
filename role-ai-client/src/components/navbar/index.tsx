import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Colors, Margin } from "../../common/styles";
import { observer } from "mobx-react-lite";
import { userStore } from "../../state/user";
import { useMenuAnchor } from "../../hooks/useMenuAnchor";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { RouteData, routes } from "../../routes";

export const Navigation = observer(() => {
  const { anchorEl, open, handleClick, handleClose } = useMenuAnchor();

  const navigate = useNavigate();

  const visibleRoutes: RouteData[] = routes.filter(
    (route: RouteData) => route.visibleOnNavbar,
  );

  const shouldShowRoute = (routeData: RouteData) => {
    if (routeData.type === "private") {
      return userStore.user != null;
    } else if (routeData.type === "restricted") {
      return userStore.user == null;
    } else {
      return true;
    }
  };

  return (
    <>
      <AppBar
        component="nav"
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
          <Stack direction="row">
            {visibleRoutes.map((route: RouteData) => (
              <Box
                key={route.id}
                sx={{ mr: Margin.M8, display: "flex", alignItems: "center" }}
                onClick={() => navigate(route.path)}
              >
                {shouldShowRoute(route) &&
                  (route.navbarElement ? (
                    <route.navbarElement />
                  ) : (
                    <Button sx={{ mr: Margin.M4 }}>{route.navbarTitle}</Button>
                  ))}
              </Box>
            ))}
          </Stack>
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
