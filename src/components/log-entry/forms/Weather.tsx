import * as React from "react";
import { useFormikContext } from "formik";
import Grid from "@material-ui/core/Grid";
import OneOfPicker from "../../pickers/OneOfPicker";

import api from "../../../api/log-api";

const FormBody = () => {
  const { values } = useFormikContext();
  const [weatherData, setWeatherData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.fetchWeathers();
      setWeatherData(result);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs>
          <OneOfPicker
            title="Prior"
            name="priorWeatherId"
            items={weatherData || []}
            value={values.priorWeatherId}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs>
          <OneOfPicker
            title="During"
            name="duringWeatherId"
            items={weatherData || []}
            value={values.duringWeatherId}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FormBody;
