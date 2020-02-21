import * as React from "react";
import { useFormikContext } from "formik";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import api from "../../../api/properties-api";

const PropertyOptions = (properties: any[]) => {
  const result: any[] = [];
  properties.forEach(p => {
    result.push(<ListSubheader key={`p_${p.id}`}>{p.name}</ListSubheader>);
    p.buildings.forEach((b: any) => {
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
  const { errors, values, setFieldValue } = useFormikContext();
  const [properties, setProperties] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.fetchProjectHierarchy();
      setProperties(result);
    };

    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid item xs>
        <FormControl fullWidth error={Boolean(errors.buildingId)}>
          <InputLabel htmlFor="buildingId">Building</InputLabel>
          <Select
            name="buildingId"
            value={values.buildingId}
            input={<Input id="buildingId" />}
            onChange={e => setFieldValue("buildingId", e.target.value)}
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
