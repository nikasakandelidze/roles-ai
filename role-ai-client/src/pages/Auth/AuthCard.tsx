import {
  Box,
  Button,
  Divider,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Colors, Margin, Padding } from "../../common/styles";
import { GoogleIcon } from "../../common/icons";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userStore } from "../../state/user";

export type AuthState = "register" | "login";

// What about introducing custom hooks instead of polluting UI code with logic and state management?
const LoginCard = observer(
  ({ toggleAuthState }: { toggleAuthState: () => void }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [tryToLogin, setTryToLogin] = useState(false);

    const navigate = useNavigate();

    // Why are we using side effect based actions vs direct actions in react?
    useEffect(() => {
      if (tryToLogin) {
        if (email && password) {
          userStore.login(email, password);
        } else {
          if (!email) {
            enqueueSnackbar("Please specify email for login", {
              variant: "info",
            });
          }
          if (!password) {
            enqueueSnackbar("Please specify password for login", {
              variant: "info",
            });
          }
        }
        setTryToLogin(false);
      }
    }, [tryToLogin, email, password]);

    useEffect(() => {
      if (userStore.loginProgress.state === "FAILED") {
        if (userStore.loginProgress.message) {
          enqueueSnackbar(userStore.loginProgress.message, {
            variant: "error",
          });
        }
        userStore.updateLoginProgressState("IDLE", null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStore.loginProgress.state, navigate]);

    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: Margin.M24, color: Colors.Dark.N700 }}
        >
          Sign in to continue to free AI Characters
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ marginBottom: Margin.M24, color: Colors.Dark.N700 }}
        >
          You'll be able to enjoy seamless AI characters
        </Typography>
        <TextField
          name="Email"
          label="Email"
          sx={{
            backgroundColor: Colors.Light.N0,
            width: "350px",
            marginBottom: Margin.M24,
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="Password"
          label="Password"
          type="password"
          sx={{
            backgroundColor: Colors.Light.N0,
            width: "350px",
            marginBottom: Margin.M24,
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={userStore.loginProgress.state === "IN_PROGRESS"}
          onClick={() => {
            setTryToLogin(true);
          }}
          color="primary"
          variant="contained"
          sx={{
            width: "350px",
            padding: Padding.P12,
            marginBottom: Margin.M12,
            opacity: userStore.loginProgress.state === "IN_PROGRESS" ? 0 : 1,
          }}
        >
          Login
        </Button>
        <LinearProgress
          sx={{
            width: "80%",
            opacity: userStore.loginProgress.state === "IN_PROGRESS" ? 1 : 0,
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: Colors.Dark.N700,
            marginBottom: Margin.M12,
            opacity: userStore.loginProgress.state === "IN_PROGRESS" ? 0 : 1,
          }}
        >
          Or
        </Typography>
        <Button
          disabled={userStore.loginProgress.state === "IN_PROGRESS"}
          onClick={() =>
            enqueueSnackbar("Google login coming soon!", {
              variant: "info",
            })
          }
          color="primary"
          variant="outlined"
          sx={{
            width: "350px",
            padding: Padding.P12,
            marginBottom: Margin.M12,
            opacity: userStore.loginProgress.state === "IN_PROGRESS" ? 0 : 1,
          }}
        >
          <GoogleIcon />
          <Box sx={{ width: "10px" }}></Box>
          Login With Google
        </Button>
        <Divider
          orientation="horizontal"
          sx={{
            height: "1px",
            width: "100%",
            opacity: 0.3,
            marginBottom: Margin.M16,
            marginTop: Margin.M12,
          }}
        />
        <Box width="100%" display="flex" justifyContent="space-between">
          <Box onClick={() => toggleAuthState()}>
            <Typography
              display="inline"
              variant="subtitle1"
              sx={{
                color: Colors.Dark.N600,
                cursor: "pointer",
                "&:hover": {
                  color: Colors.Blue.B400,
                  textDecoration: "underline",
                },
                transition: "ease-in-out 0.1s",
              }}
            >
              Not a member yet?
              <Typography
                display="inline"
                sx={{
                  color: Colors.Green.G300,
                  marginLeft: Margin.M4,
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: Colors.Dark.N600,
              cursor: "pointer",
              "&:hover": {
                color: Colors.Blue.B400,
                textDecoration: "underline",
              },
              transition: "ease-in-out 0.1s",
            }}
          >
            Forgot Password?
          </Typography>
        </Box>
      </Box>
    );
  },
);

const RegisterCard = observer(
  ({ toggleAuthState }: { toggleAuthState: () => void }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [tryToRegister, setTryToRegister] = useState(false);

    useEffect(() => {
      if (tryToRegister) {
        if (
          email &&
          password &&
          confirmPassword &&
          password === confirmPassword
        ) {
          userStore.register(email, password, confirmPassword);
        } else {
          if (!email) {
            enqueueSnackbar("Email must be present", { variant: "info" });
          }
          if (!password) {
            enqueueSnackbar("Password must be present", { variant: "info" });
          }
          if (password !== confirmPassword) {
            enqueueSnackbar("Password and Confirm Password do not match", {
              variant: "info",
            });
          }
        }
        setTryToRegister(false);
      }
    }, [tryToRegister]);

    useEffect(() => {
      if (userStore.registerProgress.state === "FAILED") {
        if (userStore.registerProgress.message)
          enqueueSnackbar(userStore.registerProgress.message, {
            variant: "error",
          });
        userStore.updateRegisterProgressState("IDLE", null);
      } else if (userStore.registerProgress.state === "SUCCESS") {
        if (userStore.registerProgress.message)
          enqueueSnackbar(userStore.registerProgress.message, {
            variant: "success",
          });
        toggleAuthState();
        userStore.updateLoginProgressState("IDLE", null);
      }
    }, [userStore.registerProgress.state]);

    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: Margin.M24, color: Colors.Dark.N700 }}
        >
          Sign Up and Enjoy AI Characters For Free
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ marginBottom: Margin.M24, color: Colors.Dark.N700 }}
        >
          First we need to know a bit about you
        </Typography>
        <TextField
          type="email"
          name="Email"
          label="Email"
          sx={{
            backgroundColor: Colors.Light.N0,
            width: "350px",
            marginBottom: Margin.M24,
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="Password"
          label="Password"
          type="password"
          sx={{
            backgroundColor: Colors.Light.N0,
            width: "350px",
            marginBottom: Margin.M24,
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          name="ConfirmPassword"
          label="Confirm Password"
          type="password"
          sx={{
            backgroundColor: Colors.Light.N0,
            width: "350px",
            marginBottom: Margin.M24,
          }}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          onClick={() => setTryToRegister(true)}
          color="primary"
          variant="contained"
          sx={{
            width: "350px",
            padding: Padding.P12,
            marginBottom: Margin.M12,
            opacity: userStore.registerProgress.state === "IN_PROGRESS" ? 0 : 1,
          }}
        >
          Sign Up
        </Button>
        <LinearProgress
          sx={{
            width: "80%",
            opacity: userStore.registerProgress.state === "IN_PROGRESS" ? 1 : 0,
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: Colors.Dark.N700,
            marginBottom: Margin.M12,
            opacity: userStore.registerProgress.state === "IN_PROGRESS" ? 0 : 1,
          }}
        >
          Or
        </Typography>
        <Button
          onClick={() => alert("Coming soon")}
          color="primary"
          variant="outlined"
          sx={{
            width: "350px",
            padding: Padding.P12,
            marginBottom: Margin.M12,
            opacity: userStore.registerProgress.state === "IN_PROGRESS" ? 0 : 1,
          }}
        >
          <GoogleIcon />
          <Box sx={{ width: "10px" }}></Box>
          Sign up With Google
        </Button>
        <Divider
          orientation="horizontal"
          sx={{
            height: "1px",
            width: "100%",
            opacity: 0.3,
            marginBottom: Margin.M16,
            marginTop: Margin.M12,
          }}
        />
        <Box width="100%" display="flex" justifyContent="space-between">
          <Box onClick={() => toggleAuthState()}>
            <Typography
              display="inline"
              variant="subtitle1"
              sx={{
                color: Colors.Dark.N600,
                cursor: "pointer",
                "&:hover": {
                  color: Colors.Blue.B400,
                  textDecoration: "underline",
                },
                transition: "ease-in-out 0.1s",
              }}
            >
              Already a member?
              <Typography
                display="inline"
                sx={{
                  color: Colors.Green.G300,
                  marginLeft: Margin.M4,
                }}
              >
                Sign in
              </Typography>
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: Colors.Dark.N600,
              cursor: "pointer",
              "&:hover": {
                color: Colors.Blue.B400,
                textDecoration: "underline",
              },
              transition: "ease-in-out 0.1s",
            }}
          >
            Forgot Password?
          </Typography>
        </Box>
      </Box>
    );
  },
);

export const AuthCard = observer(() => {
  const [authState, setAuthState] = useState<AuthState>("login");
  const toggleAuthState = useCallback(() => {
    setAuthState((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%" }}
    >
      {authState === "login" ? (
        <LoginCard toggleAuthState={toggleAuthState} />
      ) : (
        <RegisterCard toggleAuthState={toggleAuthState} />
      )}
    </Box>
  );
});
