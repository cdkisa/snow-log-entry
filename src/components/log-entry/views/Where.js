import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import { Select } from "formik-material-ui";
import api from "../../../api/properties-api";

const PropertyOptions = properties => {
  const result = [];
  properties.forEach(p => {
    result.push(<ListSubheader key={`p_${p.id}`}>{p.name}</ListSubheader>);
    p.buildings.forEach(b => {
      result.push(
        <MenuItem key={`b_${b.id}`} value={b.id}>
          {b.name}
        </MenuItem>
      );
    });
  });
  return result;
};

const FormBody = () => {
  const { errors, values } = useFormikContext();
  const isError = value => value && value.length > 0;
  const [properties, setProperties] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.fetchProjectHierarchy();
      setProperties(result);
    };

    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid item xs>
        <FormControl fullWidth error={isError(errors.buildingId)}>
          <InputLabel htmlFor="buildingId">Building</InputLabel>
          <Select
            name="buildingId"
            value={values.buildingId}
            input={<Input id="buildingId" />}
          >
            {properties && PropertyOptions(properties)}
          </Select>
          {errors.buildingId && (
            <FormHelperText>{errors.buildingId}</FormHelperText>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FormBody;
