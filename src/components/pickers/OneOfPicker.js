import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { useField } from "formik";

const OneOfPicker = ({ title, items, name }) => {
  const [field, meta, helpers] = useField(name);
  const { value, error } = meta;
  const { setValue } = helpers;

  const isSelected = v =>
    v === value
      ? { variant: "contained", color: "primary" }
      : { variant: "outlined", color: "default" };

  const isError = Boolean(error);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormHelperText
          error={isError}
          component={() => (
            <Typography color={isError ? "error" : "initial"}>
              {title}
            </Typography>
          )}
        />
      </Grid>
      {isError && <FormHelperText error>{error}</FormHelperText>}
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
