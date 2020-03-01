import * as React from "react";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import { useField } from "formik";
import { PropTypes } from "@material-ui/core";

interface Props {
  title: string;
  items?: any[];
  name: string;
  value?: number;
}

const OneOfPicker = ({ title, name }: Props) => {
  const [field, meta, helpers] = useField(name);
  const { value, error } = meta;
  const { setValue } = helpers;
  const isError = Boolean(error);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      {isError && (
        <Grid item xs={12}>
          <FormHelperText error>{error}</FormHelperText>
        </Grid>
      )}
      <Grid item xs>
        <Radio
          checked={parseInt(value, 10) === 1}
          onChange={handleOnChange}
          value={1}
          name={field.name}
        />
      </Grid>
      <Grid item xs>
        <Typography color={isError ? "error" : "initial"}>{title}</Typography>
      </Grid>
      <Grid item>
        <Radio
          checked={parseInt(value, 10) === 2}
          onChange={handleOnChange}
          value={2}
          name={field.name}
        />
      </Grid>
    </Grid>
  );
};

export default OneOfPicker;
