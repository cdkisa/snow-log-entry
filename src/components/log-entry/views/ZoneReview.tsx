import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
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

const choiceIconMap = (v: number) => {
  switch (v) {
    case 1:
      return <CheckIcon />;
    case 2:
      return <CloseIcon />;
    default:
      throw Error("Unkown choice value");
  }
};

const x = (values: any) => {
  const actionComponents = [];

  for (const action in values) {
    const actionValue = values[action];
    const icon = choiceIconMap(actionValue);

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
        {x(props.values)}
      </Grid>
    </div>
  );
};
