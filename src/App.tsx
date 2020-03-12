import * as React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollTop from "./components/ScrollTop";
import AppHeader from "./components/AppHeader";
import Home from "./components/log-entry/Home";
import appTheme from "./theme";

export default () => (
  <React.Fragment>
    <ThemeProvider theme={appTheme}>
      <AppHeader />
      <Home />
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  </React.Fragment>
);
