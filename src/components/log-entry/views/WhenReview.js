import React from "react";
import { format } from "date-fns";

const DateTimeFormat = "MM/dd/yyyy hh:MM aaaa";

export default ({ stepInfo }) => {
  console.log(stepInfo);
  return (
    <div>
      <h5>{stepInfo.stepTitle}</h5>
      Start Date/Time: {format(startDateTime, DateTimeFormat)}
      <br />
      End Date/Time: {format(endDateTime, DateTimeFormat)}
    </div>
  );
};
