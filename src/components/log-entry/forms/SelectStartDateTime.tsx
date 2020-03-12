import * as React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormLayout from "../FormLayout";
import { SelectStartDateTimeValidationSchema } from "../ValidationSchemas";
import appState from "../../../api/app-api";
import { FormikProps } from "formik";
import DateTimePicker from "../../pickers/DateTimePicker";

const DateFormat = "dd/MM/yyyy";
const TimeFormat = "hh:mm a";

const SelectStartDateTimeInitialValues = {
  startDate: appState.startDateTime,
  startTime: appState.startDateTime
};

const SelectStartDateTimeHelperText = {
  startDate: "Please select a Start Date",
  startTime: "Please select a Start Time"
};

export default () => {
  const handleSubmit = (values: any) => {
    const dtFn = new DateFnsUtils();
    const dt = new Date(values.startDate);
    const tm = new Date(values.startTime);
    const dateTime = `${dtFn.format(dt, DateFormat)} ${dtFn.format(
      tm,
      TimeFormat
    )}`;
    appState.startDateTime = dateTime;
  };

  return (
    <FormLayout
      title={"Start Date & Time"}
      initialValues={SelectStartDateTimeInitialValues}
      validationSchema={SelectStartDateTimeValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<any>) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            dateFieldProps={{
              name: "startDate",
              label: "Start Date",
              fullWidth: true,
              format: DateFormat,
              maxDate: new Date(),
              value: formikProps.values.startDate,
              helperText: SelectStartDateTimeHelperText.startDate,
              inputVariant: "outlined"
            }}
            timeFieldProps={{
              name: "startTime",
              label: "Start Time",
              fullWidth: true,
              format: TimeFormat,
              minuteStep: 5,
              maxDate: new Date(),
              value: formikProps.values.startTime,
              helperText: SelectStartDateTimeHelperText.startTime,
              inputVariant: "outlined"
            }}
          />
        </MuiPickersUtilsProvider>
      )}
    </FormLayout>
  );
};
