import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { IFormikWizardWrapperProps } from "../formik-wizard/FormikWizardTypes";

const LogEntryWizardLayout = ({
  children,
  isLastStep,
  isSubmitting,
  status,
  goToPreviousStep,
  canGoBack,
  currentStep,
  step
}: IFormikWizardWrapperProps<any>) => {
  return (
    <Card>
      {status && (
        <div>
          {status.message}
          <hr />
        </div>
      )}
      {step.stepTitle && <CardHeader title={step.stepTitle} />}
      <CardContent>{children}</CardContent>
      <CardActions disableSpacing>
        <Grid container spacing={1} justify="flex-end">
          <Grid item>
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={goToPreviousStep}
              disabled={!canGoBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              disabled={isSubmitting}
            >
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default LogEntryWizardLayout;
