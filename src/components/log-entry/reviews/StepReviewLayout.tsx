import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import uuid from "../../../utils/uuid";

export default (props: any) => {
  return (
    <Grid item xs={12}>
      <Card key={uuid()}>
        <CardHeader
          key={uuid()}
          title={props.stepReviewInfo.stepTitle}
          titleTypographyProps={{ variant: "caption" }}
        />
        <CardContent key={uuid()}>{props.children}</CardContent>
      </Card>
    </Grid>
  );
};
