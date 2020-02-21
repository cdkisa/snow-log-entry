import * as React from "react";
import * as Albus from "react-albus";
import {
  TFormikWizardBaseValues,
  IFormikWizardContextValue,
  IFormikWizardProps,
  IFormikWizardStep
} from "./FormikWizardTypes";
import FormikWizardStep from "./FormikWizardStep";

function getInitialValues(steps: IFormikWizardStep[]) {
  return steps.reduce<TFormikWizardBaseValues>((curr, next) => {
    curr[next.id] = next.initialValues;
    return curr;
  }, {});
}

const FormikWizardContext = React.createContext<IFormikWizardContextValue | null>(
  null
);

export function FormikWizard<T>({
  albusProps,
  onSubmit,
  steps,
  Form,
  render
}: IFormikWizardProps<T>) {
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
  return React.useContext(FormikWizardContext) as IFormikWizardContextValue<T>;
}
