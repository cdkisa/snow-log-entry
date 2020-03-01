import * as React from "react";
import { useFormikContext } from "formik";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const FormBody = () => {
  const { values, errors, setFieldValue } = useFormikContext();

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs>
          <TextField
            fullWidth
            multiline
            rowsMax="4"
            value={values.comments}
            onChange={e => setFieldValue("comments", e.target.value)}
            error={Boolean(errors.comments)}
            helperText={Boolean(errors.comments) && errors.comments}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FormBody;
