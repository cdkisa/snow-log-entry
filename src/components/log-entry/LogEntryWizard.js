import React, { useCallback } from "react";
import { FormikWizard } from "../formik-wizard/FormikWizard";
import wizardSteps from "./steps";
import LogEntryWizardLayout from "./LogEntryWizardLayout";

const LogEntryWizard = props => {
  const handleSubmit = useCallback(values => {
    console.log("full values:", values);

    return {
      message: "Thanks for submitting!"
    };
  }, []);

  return (
    <FormikWizard
      steps={wizardSteps}
      onSubmit={handleSubmit}
      render={LogEntryWizardLayout}
    />
  );
};

export default LogEntryWizard;
