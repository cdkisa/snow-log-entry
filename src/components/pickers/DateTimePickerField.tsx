import * as React from "react";
import { useField } from "formik";
import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface Props {
  name: string;
  onAfterChange?: (value: MaterialUiPickersDate) => void;
  label: string;
  fullWidth: boolean;
  format: string;
  minutesStep: number;
  minDate?: Date;
}

const DateTimePickerField = ({ name, onAfterChange, ...other }: Props) => {
  const [field, meta, helpers] = useField(name);
  const { value, error } = meta;
  const { setValue } = helpers;

  const setDateValue = (x: MaterialUiPickersDate) => {
    setValue(x);
    if (onAfterChange) onAfterChange(x);
    return x;
  };

  return (
    <DateTimePicker
      name={name}
      value={value}
      error={Boolean(error)}
      helperText={error}
      onChange={x => setDateValue(x)}
      {...other}
    />
  );
};

export default DateTimePickerField;
