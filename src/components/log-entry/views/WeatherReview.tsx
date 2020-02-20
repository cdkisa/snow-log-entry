import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import OpacityIcon from "@material-ui/icons/Opacity";
import LeakRemoveIcon from "@material-ui/icons/LeakRemove";
import { FormikWizardStepReviewProps } from "../../formik-wizard/FormikWizardTypes";

interface ActionCardProps {
  title: string;
  icon: JSX.Element;
}

const ActionCard = ({ title, icon }: ActionCardProps) => (
  <Grid item xs>
    <Card>
      <CardHeader title={title} />
      <CardContent>{icon}</CardContent>
    </Card>
  </Grid>
);

const weatherIconMap = (v: number) => {
  switch (v) {
    case 1:
      return <AcUnitIcon />;
    case 2:
      return <OpacityIcon />;
    case 3:
      return <LeakRemoveIcon />;
    case 4:
      return <Brightness5Icon />;
    default:
      throw Error("Unknown weather id");
  }
};

const renderChildren = (values: any) => {
  const actionComponents = [];

  for (const action in values) {
    const actionValue = values[action];
    const icon = weatherIconMap(actionValue);

    const actionComponent = <ActionCard title={action} icon={icon} />;

    actionComponents.push(actionComponent);
  }
  return actionComponents;
};

export default (props: FormikWizardStepReviewProps) => {
  return (
    <div>
      <h5>{props.stepTitle}</h5>
      <Grid container spacing={3}>
        {renderChildren(props.values)}
      </Grid>
    </div>
  );
};
