import React from "react";
import { useFormikWizard } from "../../formik-wizard/FormikWizard";
import wizardSteps from "../steps";

const getWizardStepDefinition = id => wizardSteps.find(x => x.id === id);

const mergeContextWithDefinition = ({ values }) => {
  const stepInfoList = [];
  for (const stepId in values) {
    const stepDefinition = getWizardStepDefinition(stepId);
    const stepValues = values[stepId];
    stepInfoList.push({ ...{ values: stepValues }, ...stepDefinition });
  }
  return stepInfoList;
};

const renderReviewComponents = stepInfoList =>
  stepInfoList
    .filter(x => x.reviewComponent != null)
    .map(stepInfo =>
      React.createElement(stepInfo.reviewComponent, {
        key: stepInfo.id,
        ...stepInfo
      })
    );

const SummaryInfo = () => {
  const formWizardContext = useFormikWizard();
  console.log("SUMMARY CONTEXT", formWizardContext);
  const stepInfoList = mergeContextWithDefinition(formWizardContext);
  const reviewComponents = renderReviewComponents(stepInfoList);
  return <React.Fragment>{/* {reviewComponents} */}</React.Fragment>;
};

export default SummaryInfo;
