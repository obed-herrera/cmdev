import { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, green } from "@material-ui/core/colors";

const defaultTheme = {
  palette: {
    primary: green,
    secondary: blueGrey, //ss,
    //type: "dark",
  },
  typography: {
    fontFamily: "'Calibri', bold;",
  },
  status: {
    danger: "orange",
  },
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState({
    palette: {
      primary: green,
      secondary: blueGrey,
    },
  });
  const muiTheme = createMuiTheme({
    ...defaultTheme,
    ...currentTheme,
  });
  return [muiTheme, setCurrentTheme];
}