import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { useField } from "formik";

const Title = ({ text, error, required }) => (
  <FormHelperText
    error={Boolean(error)}
    required={required}
    component={() => (
      <Typography color={Boolean(error) ? "error" : "initial"}>
        {text}
      </Typography>
    )}
  />
);

const OneOfPicker = ({ title, items, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { value, error } = meta;
  const { setValue } = helpers;

  const isSelected = v =>
    v === value
      ? { variant: "contained", color: "primary" }
      : { variant: "outlined", color: "default" };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Title text={title} error={Boolean(error)} required={true} />
      </Grid>
      {items &&
        items.map((item, index) => (
          <Grid key={`${index}_${item.id}`} item xs={12} sm>
            <Button
              fullWidth
              value={item.id}
              type="button"
              onClick={e => setValue(item.id)}
              variant={isSelected(item.id).variant}
              color={isSelected(item.id).color}
            >
              {item.label}
            </Button>
          </Grid>
        ))}
    </Grid>
  );
};

export default OneOfPicker;
