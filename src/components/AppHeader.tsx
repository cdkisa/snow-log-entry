import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default () => (
  <React.Fragment>
    <AppBar>
      <Toolbar>
        <Typography variant="h6">Snow Log Entry</Typography>
      </Toolbar>
    </AppBar>
    <Toolbar id="back-to-top-anchor" />
  </React.Fragment>
);
