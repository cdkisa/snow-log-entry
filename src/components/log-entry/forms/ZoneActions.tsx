import * as React from "react";
import OneOfPickerRadio from "../../pickers/OneOfPickerRadio";
import FormLayout from "../FormLayout";
import { FormikProps } from "formik";
import logApi from "../../../api/log-api";
import useApi from "../../useApi";
import Loading from "../../Loading";
import Grid from "@material-ui/core/Grid";

interface IProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: Function;
}

export default ({ initialValues, validationSchema, onSubmit }: IProps) => {
  const dataApi = useApi(logApi.fetchActionsAndChoices);
  if (dataApi.loading) return <Loading />;
  if (dataApi.error) throw dataApi.error;

  return (
    <FormLayout
      title={"Select Actions"}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps: FormikProps<any>) => {
        return dataApi.response.map((action: any, index: number) => (
          <Grid key={`${index}_${action.id}`} container spacing={4}>
            <Grid item xs={12}>
              <OneOfPickerRadio
                title={`${action.label}`}
                name={action.name}
                items={action.choices || []}
                value={formikProps.values[action.name]}
              />
            </Grid>
          </Grid>
        ));
      }}
    </FormLayout>
  );
};
