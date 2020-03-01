import * as React from "react";
import { IFormikWizardStepReviewProps } from "../../formik-wizard/FormikWizardTypes";
import logApi from "../../../api/log-api";
import uuid from "../../../utils/uuid";

const ActionLabelMap = {
  sand: "Sand",
  gravel: "Gravel",
  iceMelt: "Ice Melt"
};

const ChoiceLabelMap = ["?", "Yes", "No"];

const renderChildren = (values: any) => {
  const childComponents = [];

  for (const key in values) {
    const value = values[key] as number;
    const action = ActionLabelMap[key];
    const choice = ChoiceLabelMap[value];

    const childComponent = <div key={uuid()}>{`${action} = ${choice}`}</div>;

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

  console.log("values", props.values);

  return <div>{data && renderChildren(props.values)}</div>;
};
