import * as React from "react";
import { IFormikWizardStepReviewProps } from "../../formik-wizard/FormikWizardTypes";
import logApi from "../../../api/log-api";
import uuid from "../../../utils/uuid";

const weatherLabelMap = {
  priorWeatherId: "Prior Weather",
  duringWeatherId: "During Weather"
};

const renderChildren = (values: any, weatherData: any[]) => {
  const childComponents = [];

  for (const key in values) {
    const value = values[key] as number;
    const weather = weatherData.find(w => w.id === value);

    const childComponent = (
      <div key={uuid()}>{`${weatherLabelMap[key]} = ${weather.label}`}</div>
    );

    if (childComponents.length > 0) childComponents.push(<hr key={uuid()} />);
    childComponents.push(childComponent);
  }
  return childComponents;
};

export default (props: IFormikWizardStepReviewProps) => {
  const [weatherData, setWeatherData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await logApi.fetchWeathers();
      setWeatherData(result);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div key={uuid()}>
        {weatherData && renderChildren(props.values, weatherData)}
      </div>
    </React.Fragment>
  );
};
