import * as React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormLayout from "../FormLayout";
import Loading from "../../Loading";
import useApi from "../../useApi";
import api from "../../../api/properties-api";
import appState from "../../../api/app-api";
import { FormikProps } from "formik";
import { SelectProjectValidationSchema } from "../ValidationSchemas";

const SelectProjectInitialValues = {
  cityId: "",
  projectId: ""
};

const SelectProjectHelperText = {
  cityId: "Please select a City",
  projectId: "Please select a Project"
};

export default () => {
  const dataApi = useApi(api.fetchCityProjectHierarchy);
  const dataCache = React.useMemo(() => dataApi.response, [dataApi.response]);
  const [city, setCity] = React.useState();

  if (dataApi.loading) return <Loading />;
  if (dataApi.error) throw dataApi.error;

  const handleCityChange = (
    event: React.ChangeEvent<any>,
    formik: FormikProps<any>
  ) => {
    const id = event.target.value;
    const city = dataCache.find((x: any) => x.parent.id === id);
    setCity(city);
    formik.setFieldValue("projectId", SelectProjectInitialValues.projectId);
    formik.handleChange(event);
  };

  const handleSubmit = (values: any) => {
    appState.projectId = values.projectId;
  };

  return (
    <FormLayout
      title={"Select City & Project"}
      initialValues={SelectProjectInitialValues}
      validationSchema={SelectProjectValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<any>) => (
        <Grid container spacing={1}>
          <Grid item xs={12} sm>
            <TextField
              name="cityId"
              label="City"
              fullWidth
              select
              variant="outlined"
              value={formikProps.values.cityId}
              error={Boolean(formikProps.errors.cityId)}
              helperText={
                formikProps.errors.cityId || SelectProjectHelperText.cityId
              }
              onChange={e => handleCityChange(e, formikProps)}
            >
              {dataCache.map((item: any) => (
                <MenuItem key={`c_${item.parent.id}`} value={item.parent.id}>
                  {item.parent.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm>
            <TextField
              name="projectId"
              label="Project"
              fullWidth
              select
              variant="outlined"
              value={formikProps.values.projectId}
              error={Boolean(formikProps.errors.projectId)}
              helperText={
                formikProps.errors.projectId ||
                SelectProjectHelperText.projectId
              }
              onChange={formikProps.handleChange}
            >
              {city ? (
                city.children.map((project: any) => (
                  <MenuItem key={`c_${project.id}`} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={""} />
              )}
            </TextField>
          </Grid>
        </Grid>
      )}
    </FormLayout>
  );
};
