import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import Grid from "@material-ui/core/Grid";
import OneOfPicker from "../../pickers/OneOfPicker";
import api from "../../../api/log-api";

const FormBody = props => {
  console.log("form props", props);
  const { values } = useFormikContext();
  const [actionsWithChoicesData, setActionsWithChoicesData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const actionsWithChoices = await api.fetchActionsAndChoices();
      setActionsWithChoicesData(actionsWithChoices);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {actionsWithChoicesData &&
        actionsWithChoicesData.map((action, index) => (
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
