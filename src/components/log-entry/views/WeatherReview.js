import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import OpacityIcon from "@material-ui/icons/Opacity";
import LeakRemoveIcon from "@material-ui/icons/LeakRemove";

const ActionCard = ({ title, icon }) => (
  <Grid item xs>
    <Card>
      <CardHeader title={title} />
      <CardContent>{icon}</CardContent>
    </Card>
  </Grid>
);

const weatherIconMap = v => {
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

const x = values => {
  const actionComponents = [];

  for (const action in values) {
    const actionValue = values[action];
    const icon = weatherIconMap(actionValue);

    const actionComponent = <ActionCard title={action} icon={icon} />;

    actionComponents.push(actionComponent);
  }
  return actionComponents;
};

export default ({ stepInfo }) => {
  return (
    <div>
      <h5>{stepInfo.stepTitle}</h5>
      <Grid container spacing={3}>
        {x(stepInfo.values)}
      </Grid>
    </div>
  );
};
