import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import uuid from "../../../utils/uuid";

export default props => {
  return (
    <Card key={uuid()} raised>
      <CardHeader
        key={uuid()}
        title={props.stepReviewInfo.stepTitle}
        titleTypographyProps={{ variant: "caption" }}
      />
      <CardContent key={uuid()}>{props.children}</CardContent>
    </Card>
  );
};
