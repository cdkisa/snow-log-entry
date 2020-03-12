import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import logApi from "../../../api/log-api";
import useApi from "../../useApi";
import Loading from "../../Loading";

interface IProps {
  onZoneClick: (name: string) => void;
}

export default ({ onZoneClick }: IProps) => {
  const dataApi = useApi(logApi.fetchZones);

  if (dataApi.loading) return <Loading />;
  if (dataApi.error) throw dataApi.error;

  return (
    <Grid container spacing={2}>
      {dataApi.response.map((zone: any) => (
        <Grid key={zone.name} item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onZoneClick(zone.name)}
          >
            {zone.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
