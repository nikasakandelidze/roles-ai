import { createTheme } from "@mui/material/styles";

// Reference: https://atlassian.design/foundations/color/

export const Colors = {
  Primary: {
    Pacific: "#0052CC", // for primary actions, buttons, text links, for indicating progress and representing authentication.
    Squid: "#172B4D", // for body text and headings,
    Doctor: "#FFFFFF", // for page backgrounds.
  },
  // When used in conjunction with our primary palette, these colors make every moment feel on-brand and every interaction informative.
  Secondary: {
    Poppy: "#FF5630",
    Golden: "#FFAB00",
    Fine: "#36B37E",
    Tamarama: "#00B8D9",
    Dajuice: "#6554C0",
  },
  // Dark neutrals are very effective for creating contrast and are therefore the primary color used for typography.
  Dark: {
    N900: "#091E42",
    N800: "#172B4D",
    N700: "#253858",
    N600: "#344563",
    N500: "#42526E",
  },
  //The mid-neutrals N400 to N200 can be used for subtle text and icons on light-neutral backgrounds
  Mid: {
    N400: "#505F79", // secondary text || icons
    N300: "#5E6C84", // secondary text || icons
    N200: "#6B778C", // secondary text || icons
    N100: "#7A869A",
    N90: "#8993A4",
    N80: "#97A0AF",
    N70: "#A5ADBA",
    N60: "#B3BAC5",
  },
  //These are backgrounds except for background of homepage which is white
  Light: {
    N50: "#C1C7D0",
    N40: "#DFE1E6",
    N30: "#EBECF0",
    N20: "#F4F5F7",
    N10: "#FAFBFC",
    N0: "#FFFFFF",
  },
  // For messages, buttons, navigation, lozenges, badges, tabs, and the progress tracker.
  Blue: {
    B500: "#0747A6",
    B400: "#0052CC",
    B300: "#0065FF",
    B200: "#2684FF",
    B100: "#4C9AFF",
    B75: "#B3D4FF",
    B50: "#DEEBFF",
  },
  // Success
  Green: {
    G500: "#006644",
    G400: "#00875A",
    G300: "#36B37E",
    G200: "#57D9A3",
    G100: "#79F2C0",
    G75: "#ABF5D1",
    G50: "#E3FCEF",
  },
  // Error
  Red: {
    R500: "#BF2600",
    R400: "#DE350B",
    R300: "#FF5630",
    R200: "#FF7452",
    R100: "#FF8F73",
    R75: "#FFBDAD",
    R50: "#FFEBE6",
  },
  Purple: {
    P500: "#403294",
    P400: "#5243AA",
    P300: "#6554C0",
    P200: "#8777D9",
    P100: "#998DD9",
    P75: "#C0B6F2",
    P50: "#EAE6FF",
  },
};

export const FontSize = {
  h900: "35px",
  h800: "29px",
  h700: "24px",
  h600: "20px",
  h500: "16px",
  h400: "14px",
  h300: "12px",
  h200: "12px",
  h100: "11px",
};

export const FontWeight = {
  W300: "300",
  W400: "400",
  W500: "500",
  W600: "600",
  W700: "700",
};

export const BorderRadius = {
  B2: "2px",
  B4: "4px",
  B8: "8px",
  B16: "16px",
  B24: "24px",
};

export const Margin = {
  M4: "4px",
  M8: "8px",
  M12: "12px",
  M16: "16px",
  M24: "24px",
  M68: "68px",
};

export const Padding = {
  P2: "2px",
  P4: "4px",
  P6: "6px",
  P8: "8px",
  P12: "12px",
  P18: "18px",
  P24: "24px",
  P40: "40px",
  P68: "68px",
};

export const AvatarSize = {
  A4: "40px",
  A7: "70px",
  A11: "110px",
  A17: "170px",
  P24: "24px",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: Colors.Blue.B400,
      light: Colors.Blue.B200,
      dark: Colors.Blue.B500,
      contrastText: Colors.Light.N0,
    },
    secondary: {
      main: Colors.Secondary.Poppy,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      main2: Colors.Secondary.Golden,
      main3: Colors.Secondary.Fine,
      main4: Colors.Secondary.Tamarama,
      main5: Colors.Secondary.Dajuice,
    },
    background: {
      default: Colors.Light.N0,
      paper: Colors.Light.N10,
    },
    text: {
      primary: Colors.Dark.N900,
      secondary: Colors.Dark.N500,
      disabled: Colors.Mid.N300,
    },
    divider: Colors.Mid.N200,
  },
});
