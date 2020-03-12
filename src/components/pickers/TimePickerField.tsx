import * as React from "react";
import { useField } from "formik";
import { TimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { ITimePickerFieldProps } from "./types";

export default ({
  name,
  onAfterChange,
  minuteStep,
  ...other
}: ITimePickerFieldProps) => {
  const [field, meta, helpers] = useField(name);
  const { value, error } = meta;
  const { setValue } = helpers;

  const setDateValue = (x: MaterialUiPickersDate) => {
    setValue(x);
    if (onAfterChange) onAfterChange(x);
    return x;
  };

  return (
    <TimePicker
      name={name}
      value={value}
      error={Boolean(error)}
      helperText={error || other.helperText}
      onChange={x => setDateValue(x)}
      minutesStep={minuteStep}
      {...other}
    />
  );
};
