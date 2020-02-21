import * as React from "react";
import propertiesApi from "../../../api/properties-api";
import { IFormikWizardStepReviewProps } from "../../formik-wizard/FormikWizardTypes";
import uuid from "../../../utils/uuid";

export default (props: IFormikWizardStepReviewProps) => {
  const [location, setLocation] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await propertiesApi.fetchLocation(props.values.buildingId);
      setLocation(result);
    };

    fetchData();
  }, [props.values.buildingId]);

  return (
    <React.Fragment>
      <div key={uuid()}>
        {location &&
          `${location.country.name}, ${location.province.name}, ${
            location.city.name
          }, ${location.project.name}, ${location.building.name}`}
      </div>
    </React.Fragment>
  );
};
