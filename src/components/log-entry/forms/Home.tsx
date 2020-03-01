import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import stepDefinitions from "../steps";
import { IFormikWizardStepProps } from "../../formik-wizard/FormikWizardTypes";

const FormBody = ({ wizard }: IFormikWizardStepProps) => {
  const handleOnClick = (id: string) => {
    wizard.push(id);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {stepDefinitions.map(step => (
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={e => handleOnClick(step.id)}
            >
              {step.stepTitle}
            </Button>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default FormBody;
