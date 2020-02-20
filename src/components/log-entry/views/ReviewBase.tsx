import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

export default (title: string, children: any) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        {React.Children.map(children, child => {
          React.cloneElement(child, {});
        })}
      </CardContent>
    </Card>
  );
};
