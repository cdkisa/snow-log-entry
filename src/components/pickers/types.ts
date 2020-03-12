import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

export interface IDatePickerFieldProps {
  name: string;
  onAfterChange?: (value: MaterialUiPickersDate) => void;
  label: string;
  fullWidth: boolean;
  format: string;
  minDate?: Date;
  helperText?: string;
}

export interface ITimePickerFieldProps {
  name: string;
  onAfterChange?: (value: MaterialUiPickersDate) => void;
  label: string;
  fullWidth: boolean;
  format: string;
  minDate?: Date;
  helperText?: string;
  minuteStep?: number;
}

export interface IOneOfPickerRadioProps {
  title: string;
  items?: any[];
  name: string;
  value?: number;
}
