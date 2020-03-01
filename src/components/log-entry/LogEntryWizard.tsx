import * as React from "react";
import { FormikWizard } from "../formik-wizard/FormikWizard";
import wizardSteps from "./steps";
import LogEntryWizardLayoutNav from "./LogEntryWizardLayoutNav";
import { TOnSubmit } from "../formik-wizard/FormikWizardTypes";

export default () => {
  const handleSubmit: TOnSubmit = async (values: any) => {
    console.log("SUBMITTING:", values);
    const key = `snow-log-${new Date().getTime()}`;

    // localStorage.setItem(key, values);

    return {
      message: "Thanks for submitting!"
    };
  };

  return (
    <FormikWizard
      steps={wizardSteps}
      onSubmit={handleSubmit}
      render={LogEntryWizardLayoutNav}
    />
  );
};
