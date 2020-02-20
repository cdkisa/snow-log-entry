import * as React from "react";
import * as Albus from "react-albus";
import {
  FormikWizardBaseValues,
  FormikWizardContextValue,
  FormikWizardProps,
  FormikWizardStepType
} from "./FormikWizardTypes";
import FormikWizardStep from "./FormikWizardStep";

function getInitialValues(steps: FormikWizardStepType[]) {
  return steps.reduce<FormikWizardBaseValues>((curr, next) => {
    curr[next.id] = next.initialValues;
    return curr;
  }, {});
}

const FormikWizardContext = React.createContext<FormikWizardContextValue | null>(
  null
);

export function FormikWizard<T>({
  formikProps,
  albusProps,
  onSubmit,
  steps,
  Form,
  render
}: FormikWizardProps<T>) {
  const [status, setStatus] = React.useState(undefined);
  const [values, setValues] = React.useState(() => getInitialValues(steps));

  React.useEffect(() => {
    setValues(getInitialValues(steps));
    setStatus(undefined);
  }, [steps]);

  const stepIds = React.useMemo(() => steps.map(step => step.id), [steps]);

  return (
    <Albus.Wizard {...albusProps}>
      <FormikWizardContext.Provider
        value={{
          status,
          setStatus,
          values,
          setValues
        }}
      >
        <Albus.Steps>
          {steps.map(step => (
            <Albus.Step
              key={step.id}
              id={step.id}
              render={wizard => (
                <FormikWizardStep
                  wizard={wizard}
                  formikProps={formikProps}
                  onSubmit={onSubmit}
                  steps={stepIds}
                  status={status}
                  values={values}
                  setValues={setValues}
                  setStatus={setStatus}
                  step={{
                    ...step,
                    initialValues: values[step.id] || {}
                  }}
                  Form={Form}
                  FormWrapper={render}
                />
              )}
            />
          ))}
        </Albus.Steps>
      </FormikWizardContext.Provider>
    </Albus.Wizard>
  );
}

export default FormikWizard;

export function useFormikWizard<T>() {
  return React.useContext(FormikWizardContext) as FormikWizardContextValue<T>;
}
