import { extendTheme, Theme } from "@chakra-ui/react";
import { StepsTheme } from "chakra-ui-steps";
const breakpoints = {
  sm: "480px",
  md: "878px",
  lg: "1086px",
  xl: "1440px",
  "2xl": "1900px",
};
const CustomSteps = {
  ...StepsTheme,
  baseStyle: (props: any) => {
    return {
      ...StepsTheme.baseStyle(props),
      borderColor: "#fb4d47",
      icon: {
        ...StepsTheme.baseStyle(props).icon,
        strokeWidth: "1px",
      },
    };
  },
};
const colors = {
  primary: "#fb4d47",
  primaryHover: "#fb4d4799",
  primaryDisabled: "#9FD9C3",
  primaryAccent: "#E3F4ED",
  bgColor: "#f3f3f3",
  bgInput: "#F9FAFB",
  inputBorder: "#CDCDCD",
  primaryScheme: { 500: "#fb4d47", 900: "#fb4d47" },
  secondary: "#E96656",
  secondaryHover: "rgb(237,132,120)",
  error: "#D92D20",
  light: "#ffffff",
  dark: "#000000",
  darkAccent: "#333333",
  gray: {
    1: "#333333",
    2: "#4F4F4F",
    3: "#828282",
    4: "#BDBDBD",
    5: "#E0E0E0",
    6: "#F2F2F2",
  },
};
export const theme = extendTheme({
  colors,
  breakpoints,
  fonts: {
    heading: "Raleway",
    body: "Raleway",
  },
  sizes: {
    container: {
      mw: "1440px",
    },
  },
  shadows: {
    outline: "none",
  },
  components: {
    Steps: CustomSteps,
  },
}) as Theme;
