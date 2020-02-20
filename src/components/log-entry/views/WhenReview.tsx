import * as React from "react";
import { format } from "date-fns";
import { FormikWizardStepReviewProps } from "../../formik-wizard/FormikWizardTypes";

const DateTimeFormat = "MM/dd/yyyy hh:MM a";

export default (props: FormikWizardStepReviewProps) => {
  const { startDateTime, endDateTime } = props.values;
  return (
    <div>
      <h5>{props.stepTitle}</h5>
      Start Date/Time: {format(startDateTime, DateTimeFormat)}
      <br />
      End Date/Time: {format(endDateTime, DateTimeFormat)}
    </div>
  );
};
