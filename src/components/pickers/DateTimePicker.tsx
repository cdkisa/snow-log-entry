import * as React from "react";
import Grid from "@material-ui/core/Grid";
import DatePickerField from "./DatePickerField";
import TimePickerField from "./TimePickerField";

export default ({ dateFieldProps, timeFieldProps }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DatePickerField {...dateFieldProps} />
      </Grid>
      <Grid item xs={12}>
        <TimePickerField {...timeFieldProps} />
      </Grid>
    </Grid>
  );
};
