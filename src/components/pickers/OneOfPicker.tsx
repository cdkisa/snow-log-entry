import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { useField } from "formik";
import { PropTypes } from "@material-ui/core";

interface Props {
  title?: string;
  items: any[];
  name: string;
  value?: any;
}

enum Variant {
  Text = "text",
  Contained = "contained",
  Outlined = "outlined"
}

interface Selected {
  variant: Variant;
  color: PropTypes.Color;
}

const OneOfPicker = ({ title, items, name }: Props) => {
  const [field, meta, helpers] = useField(name);
  const { value, error } = meta;
  const { setValue } = helpers;

  const isSelected = (v: string): Selected =>
    v === value
      ? { variant: Variant.Contained, color: "primary" }
      : { variant: Variant.Outlined, color: "default" };

  const isError = Boolean(error);

  return (
    <Grid container spacing={1}>
      {title && (
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
      )}
      {isError && <FormHelperText error>{error}</FormHelperText>}
      {items &&
        items.map((item, index) => {
          const idAsString = item.id.toString();
          return (
            <Grid key={`${index}_${idAsString}`} item xs={12} sm>
              <Button
                fullWidth
                value={idAsString}
                type="button"
                onClick={e => setValue(idAsString)}
                variant={isSelected(idAsString).variant}
                color={isSelected(idAsString).color}
              >
                {item.label || item.name || "? text ?"}
              </Button>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default OneOfPicker;
