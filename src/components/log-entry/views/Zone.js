import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import Grid from "@material-ui/core/Grid";
import OneOfPicker from "../../pickers/OneOfPicker";
import api from "../../../api/log-api";

const FormBody = () => {
  const { values } = useFormikContext();
  // const [choicesData, setChoicesData] = useState();
  const [actionsWithChoicesData, setActionsWithChoicesData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // const result = await api.fetchChoices();
      const actionsWithChoices = await api.fetchActionsAndChoices();

      // setChoicesData(result);
      setActionsWithChoicesData(actionsWithChoices);
      // console.log(actionsWithChoices);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {actionsWithChoicesData &&
        actionsWithChoicesData.map((action, index) => (
          <OneOfPicker
            title={`I applied ${action.label}`}
            name={action.name}
            items={action.choices || []}
            value={values[action.name]}
          />
          // <Grid key={`${index}_${action.id}`} container spacing={4}>
          //   <Grid item xs />
          // </Grid>
        ))}
      {/* 
      <Grid container spacing={4}>
        <Grid item xs>
          <OneOfPicker
            title="I applied Sand"
            name="sand"
            items={choicesData || []}
            value={values.sand}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs>
          <OneOfPicker
            title="I applied Gravel"
            name="gravel"
            items={choicesData || []}
            value={values.gravel}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs>
          <OneOfPicker
            title="I applied Ice Melt"
            name="iceMelt"
            items={choicesData || []}
            value={values.iceMelt}
          />
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
};

export default FormBody;
