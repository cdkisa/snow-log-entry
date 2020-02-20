import * as React from "react";
import propertiesApi from "../../../api/properties-api";
import { FormikWizardStepReviewProps } from "../../formik-wizard/FormikWizardTypes";

export default (props: FormikWizardStepReviewProps) => {
  const [location, setLocation] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await propertiesApi.fetchLocation(props.values.buildingId);
      setLocation(result);
    };

    fetchData();
  }, [props.values.buildingId]);

  return (
    <div>
      <h5>{props.stepTitle}</h5>
      {location &&
        `${location.country.name}, ${location.province.name}, ${
          location.city.name
        }, ${location.project.name}, ${location.building.name}`}
    </div>
  );
};
