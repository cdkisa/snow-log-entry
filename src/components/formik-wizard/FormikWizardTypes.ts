import { FormikProps, FormikErrors } from "formik";
import { WizardContext, WizardProps } from "react-albus";
import { Schema } from "yup";

export type FormikWizardBaseValues = any;

export interface FormikWizardStepProps
  extends FormikWizardContextValue<FormikWizardBaseValues, any> {
  step: FormikWizardStepType;
  Form?: any;
  steps: string[];
  FormWrapper: React.SFC<FormikWizardWrapperProps<any>>;
  wizard: WizardContext;
  formikProps?: Partial<FormikProps<any>>;
  onSubmit: FormikWizardProps<any>["onSubmit"];
}

export interface FormikWizardContextValue<V = any, S = any> {
  status: S;
  setStatus: React.Dispatch<React.SetStateAction<S>>;
  values: V;
  setValues: React.Dispatch<React.SetStateAction<V>>;
}

export interface FormikWizardStepType {
  id: string;
  component: React.SFC<{}>;
  validationSchema?: Schema<any>;
  validate?: (values: any) => void | object | Promise<FormikErrors<any>>;
  initialValues?: FormikWizardBaseValues;
  actionLabel?: string;
  onAction?: (
    sectionValues: FormikWizardBaseValues,
    formValues: FormikWizardBaseValues
  ) => Promise<any>;
  keepValuesOnPrevious?: boolean;
  meta?: any;
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
  render: React.SFC<FormikWizardWrapperProps<Values, Status>>;
  onSubmit: (values: Values) => void | Promise<any>;
  formikProps?: Partial<FormikProps<Values>>;
  albusProps?: Partial<WizardProps>;
  Form?: any;
}
