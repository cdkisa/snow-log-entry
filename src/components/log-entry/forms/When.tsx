import * as React from "react";
import { useFormikContext } from "formik";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DateTimePickerField from "../../pickers/DateTimePickerField";

const DateTimeFormat = "dd/MM/yyyy hh:mm a";

const FormBody = () => {
  const { initialValues } = useFormikContext();

  const [endDateMin, setEndDateMin] = React.useState(
    initialValues.startDateTime
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DateTimePickerField
            name="startDateTime"
            label="Start Date/Time"
            fullWidth
            format={DateTimeFormat}
            minutesStep={5}
            onAfterChange={x => setEndDateMin(x)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePickerField
            name="endDateTime"
            label="End Date/Time"
            format={DateTimeFormat}
            fullWidth
            minDate={endDateMin}
            minutesStep={5}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default FormBody;
