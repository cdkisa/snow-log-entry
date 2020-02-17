import React from "react";
import { useField } from "formik";
import { DatePicker } from "@material-ui/pickers";

const DatePickerField = ({ name, onAfterChange, ...other }) => {
  const [field, meta, helpers] = useField(name);
  const { value, error } = meta;
  const { setValue } = helpers;

  const setDateValue = x => {
    setValue(x);
    if (onAfterChange) onAfterChange(x);
  };

  return (
    <DatePicker
      name={name}
      value={value}
      error={Boolean(error)}
      helperText={error}
      onChange={x => setDateValue(x)}
      {...other}
    />
  );
};

export default DatePickerField;
