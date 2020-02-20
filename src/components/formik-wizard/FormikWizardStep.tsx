import * as React from "react";
import { Form as DefaultForm, Formik } from "formik";
import produce from "immer";
import { FormikWizardStepProps } from "./FormikWizardTypes";

const FormikWizardStep = ({
  step,
  Form = DefaultForm,
  FormWrapper,
  steps,
  wizard,
  formikProps,
  onSubmit,
  setStatus,
  status,
  values,
  setValues
}: FormikWizardStepProps) => {
  const info = React.useMemo(() => {
    return {
      canGoBack: steps[0] !== step.id,
      currentStep: step.id,
      isLastStep: steps[steps.length - 1] === step.id
    };
  }, [steps, step]);

  const handleSubmit = React.useCallback(
    async sectionValues => {
      setStatus(undefined);

      let status: any;

      try {
        if (info.isLastStep) {
          const newValues = produce(values, (draft: any) => {
            draft[info.currentStep] = sectionValues;
          });
          status = await onSubmit(newValues);
          setValues(newValues);
        } else {
          status = step.onAction
            ? await step.onAction(sectionValues, values)
            : undefined;

          console.log(`section values`, sectionValues);

          setValues((values: any) => {
            return produce(values, (draft: any) => {
              draft[info.currentStep] = sectionValues;
            });
          });

          setImmediate(wizard.next);
        }
      } catch (e) {
        status = e;
      }

      setStatus(status);
    },
    [
      info.currentStep,
      info.isLastStep,
      onSubmit,
      setStatus,
      setValues,
      step,
      values,
      wizard
    ]
  );

  return (
    <Formik
      {...formikProps}
      enableReinitialize
      initialValues={step.initialValues}
      validationSchema={step.validationSchema}
      validate={step.validate}
      onSubmit={handleSubmit}
    >
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <FormWrapper
            {...info}
            steps={steps}
            wizard={wizard}
            isSubmitting={props.isSubmitting}
            step={step}
            goToPreviousStep={() => {
              setStatus(undefined);

              if (step.keepValuesOnPrevious) {
                setValues((values: any) =>
                  produce(values, (draft: any) => {
                    draft[step.id] = props.values;
                  })
                );
              }

              wizard.previous();
            }}
            status={status}
            values={values}
            setStatus={status}
            setValues={setValues}
          >
            {React.createElement(step.component)}
          </FormWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default FormikWizardStep;
