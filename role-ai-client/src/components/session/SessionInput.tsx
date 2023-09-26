import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { BorderRadius, Colors, Padding } from "../../common/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";

export const SessionInput = ({
  input,
  setInput,
  setTryToSend,
  disable,
  inputRef,
}: {
  input: string;
  setInput: (data: string) => void;
  setTryToSend: (value: boolean) => void;
  disable: boolean;
  inputRef?: any;
}) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <Grid container justifyContent="center" item xs={12}>
      <Grid item xs={6} position="relative">
        <TextField
          inputRef={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          variant="outlined"
          placeholder="Send a message"
          sx={{
            display: "flex",
            flex: 1,
            borderRadius: BorderRadius.B8,
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
            "& fieldset": { border: "none" },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && focused && !disable) {
              setTryToSend(true);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  disabled={disable}
                  onClick={() => {
                    setTryToSend(true);
                  }}
                  edge="end"
                  sx={{
                    paddingLeft: Padding.P12,
                    paddingRight: Padding.P12,
                    paddingTop: Padding.P12,
                    paddingBottom: Padding.P12,
                    backgroundColor:
                      input.length > 0 ? Colors.Green.G300 : "inherit",
                    color:
                      input.length > 0 ? Colors.Light.N0 : Colors.Dark.N700,
                    transition: "ease-in-out 0.1s",
                    borderRadius: BorderRadius.B16,
                  }}
                >
                  {disable ? (
                    <MoreHorizIcon fontSize="medium" />
                  ) : (
                    <SendIcon fontSize="medium" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};
