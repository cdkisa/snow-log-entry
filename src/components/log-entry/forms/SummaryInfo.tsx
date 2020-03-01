import * as React from "react";
import { useFormikWizard } from "../../formik-wizard/FormikWizard";
import wizardSteps from "../steps";
import {
  IFormikWizardContextValue,
  IFormikWizardStepReviewProps
} from "../../formik-wizard/FormikWizardTypes";
import Grid from "@material-ui/core/Grid";
import StepReviewLayout from "../reviews/StepReviewLayout";

const createReviewStepProps = ({ values }: IFormikWizardContextValue) => {
  return Object.keys(values).map(key => ({
    id: key,
    stepTitle: wizardSteps.find(x => x.id === key)!.stepTitle,
    values: values[key]
  }));
};

const renderReviewComponents = (
  reviewStepProps: IFormikWizardStepReviewProps[]
) => (
  <Grid container spacing={2}>
    {wizardSteps
      .filter(step => step.reviewComponent)
      .map(step => (
        <StepReviewLayout
          key={step.id}
          stepReviewInfo={reviewStepProps.find(p => p.id === step.id)}
        >
          {React.createElement(
            step.reviewComponent,
            reviewStepProps.find(p => p.id === step.id)
          )}
        </StepReviewLayout>
      ))}
  </Grid>
);

const SummaryInfo = () => {
  const formWizardContext = useFormikWizard();
  // console.log("SUMMARY CONTEXT", formWizardContext);
  const reviewStepProps = createReviewStepProps(formWizardContext);
  // console.log("REVIEW STEP PROPS", reviewStepProps);

  return (
    <React.Fragment>{renderReviewComponents(reviewStepProps)}</React.Fragment>
  );
};

export default SummaryInfo;
