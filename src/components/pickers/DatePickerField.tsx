import * as React from "react";
import { useField } from "formik";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { IDatePickerFieldProps } from "./types";

export default ({ name, onAfterChange, ...other }: IDatePickerFieldProps) => {
  const [field, meta, helpers] = useField(name);
  const { value, error } = meta;
  const { setValue } = helpers;

  const setDateValue = (x: MaterialUiPickersDate) => {
    setValue(x);
    if (onAfterChange) onAfterChange(x);
    return x;
  };

  return (
    <DatePicker
      name={name}
      value={value}
      error={Boolean(error)}
      helperText={error || other.helperText}
      onChange={x => setDateValue(x)}
      {...other}
    />
  );
};
