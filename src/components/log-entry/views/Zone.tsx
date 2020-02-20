import * as React from "react";
import { useFormikContext } from "formik";
import Grid from "@material-ui/core/Grid";
import OneOfPicker from "../../pickers/OneOfPicker";
import api from "../../../api/log-api";

const FormBody = () => {
  const { values } = useFormikContext();
  const [actionsWithChoicesData, setActionsWithChoicesData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const actionsWithChoices = await api.fetchActionsAndChoices();
      setActionsWithChoicesData(actionsWithChoices);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {actionsWithChoicesData &&
        actionsWithChoicesData.map((action: any, index: number) => (
          <Grid key={`${index}_${action.id}`} container spacing={4}>
            <Grid item xs>
              <OneOfPicker
                title={`I applied ${action.label}`}
                name={action.name}
                items={action.choices || []}
                value={values[action.name]}
              />
            </Grid>
          </Grid>
        ))}
    </React.Fragment>
  );
};

export default FormBody;
