import * as React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormLayout from "../FormLayout";
import { FormikProps } from "formik";
import { CommentsValidationSchema } from "../ValidationSchemas";

const CommentsInitialValues = {
  comments: ""
};

export default () => {
  const handleSubmit = (values: any) => console.log("comments", values);
  return (
    <FormLayout
      title={"Enter Comments"}
      initialValues={CommentsInitialValues}
      validationSchema={CommentsValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<any>) => (
        <Grid container spacing={4}>
          <Grid item xs>
            <TextField
              fullWidth
              multiline
              rowsMax="4"
              variant="outlined"
              value={formikProps.values.comments}
              onChange={e =>
                formikProps.setFieldValue("comments", e.target.value)
              }
              error={Boolean(formikProps.errors.comments)}
              helperText={
                Boolean(formikProps.errors.comments) &&
                formikProps.errors.comments
              }
            />
          </Grid>
        </Grid>
      )}
    </FormLayout>
  );
};
