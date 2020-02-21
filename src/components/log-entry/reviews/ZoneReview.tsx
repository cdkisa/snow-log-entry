import * as React from "react";
import { IFormikWizardStepReviewProps } from "../../formik-wizard/FormikWizardTypes";
import logApi from "../../../api/log-api";
import uuid from "../../../utils/uuid";

const renderChildren = (values: any, data: any) => {
  const childComponents = [];

  for (const key in values) {
    const value = values[key] as number;
    const action = data.actionsData.find(x => x.name === key);
    const choice = data.choicesData.find(x => x.id === value);

    const childComponent = (
      <div key={uuid()}>{`I applied ${action.label} = ${choice.label}`}</div>
    );

    if (childComponents.length > 0) childComponents.push(<hr key={uuid()} />);
    childComponents.push(childComponent);
  }
  return childComponents;
};

export default (props: IFormikWizardStepReviewProps) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await logApi.fetchZonesActionsChoices();
      setData(result);
    };

    fetchData();
  }, []);

  return <div key={uuid()}>{data && renderChildren(props.values, data)}</div>;
};
