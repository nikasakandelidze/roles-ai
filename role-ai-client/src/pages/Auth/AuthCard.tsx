import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Colors, Margin, Padding } from "../../common/styles";
import { GoogleIcon } from "../../common/icons";

export type AuthState = "register" | "login";

const LoginCard = ({ toggleAuthState }: { toggleAuthState: () => void }) => {
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
        Sign in to continue
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
      />
      <Button
        color="primary"
        variant="contained"
        sx={{ width: "350px", padding: Padding.P12, marginBottom: Margin.M12 }}
      >
        Login
      </Button>
      <Typography
        variant="body1"
        sx={{ color: Colors.Dark.N700, marginBottom: Margin.M12 }}
      >
        Or
      </Typography>
      <Button
        onClick={() => alert("Coming soon")}
        color="primary"
        variant="outlined"
        sx={{ width: "350px", padding: Padding.P12, marginBottom: Margin.M12 }}
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
            "&:hover": { color: Colors.Blue.B400, textDecoration: "underline" },
            transition: "ease-in-out 0.1s",
          }}
        >
          Forgot Password?
        </Typography>
      </Box>
    </Box>
  );
};

const RegisterCard = ({ toggleAuthState }: { toggleAuthState: () => void }) => {
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
        name="Email"
        label="Email"
        sx={{
          backgroundColor: Colors.Light.N0,
          width: "350px",
          marginBottom: Margin.M24,
        }}
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
      />
      <Button
        color="primary"
        variant="contained"
        sx={{ width: "350px", padding: Padding.P12, marginBottom: Margin.M12 }}
      >
        Sign Up
      </Button>
      <Typography
        variant="body1"
        sx={{ color: Colors.Dark.N700, marginBottom: Margin.M12 }}
      >
        Or
      </Typography>
      <Button
        onClick={() => alert("Coming soon")}
        color="primary"
        variant="outlined"
        sx={{ width: "350px", padding: Padding.P12, marginBottom: Margin.M12 }}
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
            "&:hover": { color: Colors.Blue.B400, textDecoration: "underline" },
            transition: "ease-in-out 0.1s",
          }}
        >
          Forgot Password?
        </Typography>
      </Box>
    </Box>
  );
};

export const AuthCard = () => {
  const [authState, setAuthState] = useState<AuthState>("login");

  const toggleAuthState = () => {
    setAuthState((prev) => (prev === "login" ? "register" : "login"));
  };

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
};
