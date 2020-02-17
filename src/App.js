import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import appTheme from "./theme";
import LogEntryWizard from "./components/log-entry/LogEntryWizard";

export default () => (
  <React.Fragment>
    <CssBaseline />
    <ThemeProvider theme={appTheme}>
      <LogEntryWizard />
    </ThemeProvider>
  </React.Fragment>
);
