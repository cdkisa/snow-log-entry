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
      React.createElement(stepInfo.reviewComponent, { stepInfo })
    );

const SummaryInfo = () => {
  const formWizardContext = useFormikWizard();
  console.log(formWizardContext);
  // const stepInfoList = mergeContextWithDefinition(formWizardContext);
  // console.log("Step Info List", stepInfoList);
  // const reviewComponents = renderReviewComponents(stepInfoList);
  // console.log(reviewComponents);
  return (
    <React.Fragment>
      UNDER CONSTRUCTION
      {/* {reviewComponents} */}
    </React.Fragment>
  );
};

export default SummaryInfo;
