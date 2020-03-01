import { FormikErrors, FormikConfig } from "formik";
import { WizardContext, WizardProps } from "react-albus";
import { Schema } from "yup";

export type TFormikWizardBaseValues = any;

export interface IFormikWizardContextValue<V = any, S = any> {
  status: S;
  setStatus: React.Dispatch<React.SetStateAction<S>>;
  values: V;
  setValues: React.Dispatch<React.SetStateAction<V>>;
}

export type TValidate = (
  values: any
) => void | object | Promise<FormikErrors<any>>;

export type TOnAction = (
  sectionValues: TFormikWizardBaseValues,
  formValues: TFormikWizardBaseValues
) => Promise<any>;

export interface IFormikConfigProps {
  initialValues: any;
  validationSchema: Schema<any>;
}

export interface IFormikWizardStep {
  id: string;
  component: React.FC<IFormikWizardStepProps>;
  stepTitle?: string;
  reviewComponent?: React.FC<IFormikWizardStepReviewProps>;
  onAction?: TOnAction;
  keepValuesOnPrevious?: boolean;
  formikProps?: Partial<FormikConfig<any>>;
}

export interface IFormikWizardStepReviewProps {
  id: string;
  stepTitle?: string;
  values: TFormikWizardBaseValues;
}

export interface IFormikWizardStepProps
  extends IFormikWizardContextValue<TFormikWizardBaseValues, any> {
  step: IFormikWizardStep;
  Form?: any;
  steps: string[];
  FormWrapper: React.FC<IFormikWizardWrapperProps<any>>;
  wizard: WizardContext;
  onSubmit: IFormikWizardProps<any>["onSubmit"];
}

export interface IFormikWizardWrapperProps<Values, Status = any>
  extends IFormikWizardContextValue<Values, Status> {
  canGoBack: boolean;
  goToPreviousStep: () => void;
  goToStepId: (getStepId: () => void) => void;
  currentStep: string;
  isLastStep: boolean;
  steps: string[];
  wizard: WizardContext;
  children: React.ReactNode;
  isSubmitting: boolean;
  step: IFormikWizardStep;
}

export type TOnSubmit = (values: any) => void | Promise<any>;

export interface IFormikWizardProps<Values, Status = any> {
  steps: IFormikWizardStep[];
  render: React.FC<IFormikWizardWrapperProps<Values, Status>>;
  onSubmit: TOnSubmit;
  albusProps?: Partial<WizardProps>;
  Form?: any;
}
