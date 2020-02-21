import * as React from "react";
import { format } from "date-fns";
import { IFormikWizardStepReviewProps } from "../../formik-wizard/FormikWizardTypes";
import uuid from "../../../utils/uuid";

const DateTimeFormat = "MM/dd/yyyy hh:MM a";

export default (props: IFormikWizardStepReviewProps) => {
  const { startDateTime, endDateTime } = props.values;
  return (
    <React.Fragment>
      <div key={uuid()}>
        Start Date/Time: {format(startDateTime, DateTimeFormat)}
      </div>
      <div key={uuid()}>
        End Date/Time: {format(endDateTime, DateTimeFormat)}
      </div>
    </React.Fragment>
  );
};
