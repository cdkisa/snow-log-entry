import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const ActionCard = ({ title, icon }) => (
  <Grid item xs>
    <Card>
      <CardHeader title={title} />
      <CardContent>{icon}</CardContent>
    </Card>
  </Grid>
);

const choiceIconMap = v => {
  switch (v) {
    case 1:
      return <CheckIcon />;
    case 2:
      return <CloseIcon />;
    default:
      throw Error("Unkown choice value");
  }
};

const x = values => {
  const actionComponents = [];

  for (const action in values) {
    const actionValue = values[action];
    const icon = choiceIconMap(actionValue);

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
