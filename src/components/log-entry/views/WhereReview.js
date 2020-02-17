import React, { useState, useEffect } from "react";
import propertiesApi from "../../../api/properties-api";

export default ({ stepInfo }) => {
  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await propertiesApi.fetchLocation(
        stepInfo.values.buildingId
      );
      setLocation(result);
    };

    fetchData();
  }, [stepInfo.values.buildingId]);

  return (
    <div>
      <h5>{stepInfo.stepTitle}</h5>
      {location &&
        `${location.country.name}, ${location.province.name}, ${
          location.city.name
        }, ${location.project.name}, ${location.building.name}`}
    </div>
  );
};
