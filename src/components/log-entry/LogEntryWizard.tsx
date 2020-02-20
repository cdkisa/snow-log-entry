import * as React from "react";
import { FormikWizard } from "../formik-wizard/FormikWizard";
import wizardSteps from "./steps";
import LogEntryWizardLayout from "./LogEntryWizardLayout";

export default () => {
  const handleSubmit = async (values: any) => {
    console.log("full values:", values);

    return {
      message: "Thanks for submitting!"
    };
  };

  return (
    <FormikWizard
      steps={wizardSteps}
      onSubmit={handleSubmit}
      render={LogEntryWizardLayout}
    />
  );
};
