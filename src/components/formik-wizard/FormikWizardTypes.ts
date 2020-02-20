import { FormikProps, FormikErrors, FormikConfig } from "formik";
import { WizardContext, WizardProps } from "react-albus";
import { Schema } from "yup";

export type FormikWizardBaseValues = any;

export interface FormikWizardContextValue<V = any, S = any> {
  status: S;
  setStatus: React.Dispatch<React.SetStateAction<S>>;
  values: V;
  setValues: React.Dispatch<React.SetStateAction<V>>;
}

export interface FormikWizardStepType {
  id: string;
  component: React.FunctionComponent<{}>;
  stepTitle?: string;
  reviewComponent?: React.FunctionComponent<FormikWizardStepReviewProps>;
  validationSchema?: Schema<any>;
  validate?: (values: any) => void | object | Promise<FormikErrors<any>>;
  initialValues?: FormikWizardBaseValues;
  onAction?: (
    sectionValues: FormikWizardBaseValues,
    formValues: FormikWizardBaseValues
  ) => Promise<any>;
  keepValuesOnPrevious?: boolean;
  formikProps?: Partial<FormikConfig<any>>;
}

export interface FormikWizardStepReviewProps {
  id: string;
  stepTitle?: string;
  values: FormikWizardBaseValues;
}

export interface FormikWizardStepProps
  extends FormikWizardContextValue<FormikWizardBaseValues, any> {
  step: FormikWizardStepType;
  Form?: any;
  steps: string[];
  FormWrapper: React.FunctionComponent<FormikWizardWrapperProps<any>>;
  wizard: WizardContext;
  onSubmit: FormikWizardProps<any>["onSubmit"];
}

export interface FormikWizardWrapperProps<Values, Status = any>
  extends FormikWizardContextValue<Values, Status> {
  canGoBack: boolean;
  goToPreviousStep: () => void;
  currentStep: string;
  isLastStep: boolean;
  steps: string[];
  wizard: WizardContext;
  children: React.ReactNode;
  isSubmitting: boolean;
  step: FormikWizardStepType;
}

export interface FormikWizardProps<Values, Status = any> {
  steps: FormikWizardStepType[];
  render: React.FunctionComponent<FormikWizardWrapperProps<Values, Status>>;
  onSubmit: (values: Values) => void | Promise<any>;
  albusProps?: Partial<WizardProps>;
  Form?: any;
}
