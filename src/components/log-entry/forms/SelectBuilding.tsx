import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormLayout from "../FormLayout";
import Loading from "../../Loading";
import useApi from "../../useApi";
import api from "../../../api/properties-api";
import appState from "../../../api/app-api";
import { FormikProps } from "formik";
import OneOfPicker from "../../pickers/OneOfPicker";
import { SelectBuildingValidationSchema } from "../ValidationSchemas";

const SelectBuildingInitialValues = {
  buildingId: appState.buildingId
};

export default () => {
  const dataApi = useApi(
    api.fetchProjectBuildingsByProject,
    parseInt(appState.projectId, 10)
  );
  const dataCache = React.useMemo(() => dataApi.response, [dataApi.response]);

  if (dataApi.loading) return <Loading />;
  if (dataApi.error) throw dataApi.error;

  const handleSubmit = (values: any) => {
    appState.buildingId = values.buildingId;
  };

  return (
    <FormLayout
      title={"Select A Building"}
      initialValues={SelectBuildingInitialValues}
      validationSchema={SelectBuildingValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<any>) => (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography color="primary" display="block" variant="h6">
              {dataCache.parent.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <OneOfPicker
              items={dataCache.children}
              name="buildingId"
              value={formikProps.values.buildingId}
            />
          </Grid>
        </Grid>
      )}
    </FormLayout>
  );
};
