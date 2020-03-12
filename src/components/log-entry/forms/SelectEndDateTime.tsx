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

const SelectEndDateTimeInitialValues = {
  endDate: appState.endDateTime,
  endTime: appState.endDateTime
};

const SelectEndDateTimeHelperText = {
  endDate: "Please select a End Date",
  endTime: "Please select a End Time"
};

export default () => {
  const handleSubmit = (values: any) => {
    const dtFn = new DateFnsUtils();
    const dt = new Date(values.endDate);
    const tm = new Date(values.endTime);
    const dateTime = `${dtFn.format(dt, DateFormat)} ${dtFn.format(
      tm,
      TimeFormat
    )}`;
    appState.endDateTime = dateTime;
  };

  return (
    <FormLayout
      title={"End Date & Time"}
      initialValues={SelectEndDateTimeInitialValues}
      validationSchema={SelectStartDateTimeValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<any>) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            dateFieldProps={{
              name: "endDate",
              label: "End Date",
              fullWidth: true,
              format: DateFormat,
              maxDate: new Date(),
              value: formikProps.values.endDate,
              helperText: SelectEndDateTimeHelperText.endDate,
              inputVariant: "outlined"
            }}
            timeFieldProps={{
              name: "endTime",
              label: "End Time",
              fullWidth: true,
              format: TimeFormat,
              minuteStep: 5,
              maxDate: new Date(),
              value: formikProps.values.endTime,
              helperText: SelectEndDateTimeHelperText.endTime,
              inputVariant: "outlined"
            }}
          />
        </MuiPickersUtilsProvider>
      )}
    </FormLayout>
  );
};
