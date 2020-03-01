import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import stepDefinitions from "./components/log-entry/steps";

export default () => (
  <React.Fragment>
    <Grid container direction="column" spacing={2}>
      {stepDefinitions.map(step => (
        <Grid item xs={12}>
          <Button variant="contained" size="large" fullWidth>
            {step.stepTitle}
          </Button>
        </Grid>
      ))}
    </Grid>
  </React.Fragment>
);
