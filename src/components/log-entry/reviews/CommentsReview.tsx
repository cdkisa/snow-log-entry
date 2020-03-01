import * as React from "react";
import { IFormikWizardStepReviewProps } from "../../formik-wizard/FormikWizardTypes";

export default (props: IFormikWizardStepReviewProps) => {
  return (
    <React.Fragment>
      <div>{props.values.comments}</div>
    </React.Fragment>
  );
};
