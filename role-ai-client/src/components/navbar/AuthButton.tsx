import { Button } from "@mui/material";
import { BorderRadius, Colors, Padding } from "../../common/styles";

export const AuthButton = ({ text = "Get Started" }: { text: string }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        padding: Padding.P8,
        backgroundColor: Colors.Blue.B300,
        color: Colors.Light.N0,
        borderRadius: BorderRadius.B16,
        "&:hover": {
          backgroundColor: Colors.Blue.B500,
        },
      }}
    >
      {text}
    </Button>
  );
};
