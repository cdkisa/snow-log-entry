import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Formik } from "formik";
import { withErrorBoundary } from "../withErrorBoundary";

const ConsoleLogSubmitHandler = (values: any) =>
  console.log(JSON.stringify(values, null, 2));

export default withErrorBoundary(props => {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {props.title && (
            <Typography
              align="center"
              color="primary"
              display="block"
              variant="h6"
            >
              {props.title}
            </Typography>
          )}
        </Grid>

        <Formik
          {...props}
          onSubmit={props.onSubmit ? props.onSubmit : ConsoleLogSubmitHandler}
        >
          {formikProps => {
            return (
              <form>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    {React.createElement(props.children, formikProps)}
                  </Grid>
                </Grid>
                <Grid container spacing={2} justify="flex-end">
                  <Grid item>
                    <Button
                      type="button"
                      variant="contained"
                      size="large"
                      onClick={formikProps.handleReset}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={formikProps.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Grid>
    </React.Fragment>
  );
});
