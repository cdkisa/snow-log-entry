import * as React from "react";
import { useFormikContext } from "formik";
import { useFormikWizard } from "../../formik-wizard/FormikWizard";
import wizardSteps from "../steps";

const getWizardStepDefinition = (id: string) =>
  wizardSteps.find(x => x.id === id);

const mergeContextWithDefinition = ({ values }) => {
  Object.keys(values).forEach(key => console.log("VALUES", values[key]));
  return [];
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
  const formikContext = useFormikContext();
  console.log("FORMIK CONTEXT", formikContext);
  const formWizardContext = useFormikWizard();
  console.log("SUMMARY CONTEXT", formWizardContext);

  return (
    <React.Fragment>
      {mergeContextWithDefinition(formWizardContext)}
    </React.Fragment>
  );
};

export default SummaryInfo;
