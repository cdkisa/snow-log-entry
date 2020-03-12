import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import SelectProject from "./forms/SelectProject";
import SelectBuilding from "./forms/SelectBuilding";
import SelectStartDateTime from "./forms/SelectStartDateTime";
import SelectEndDateTime from "./forms/SelectEndDateTime";
import SelectZone from "./forms/SelectZone";
import ZoneActions from "./forms/ZoneActions";
import Comments from "./forms/Comments";

import { ZoneActionsValidationSchema } from "./ValidationSchemas";
const ZoneActionsInitialValues = {
  sand: 0,
  gravel: 0,
  iceMelt: 0
};
const zoneActionSubmitHandler = (values: any) =>
  console.log("zone values", values);

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: "100%"
    },
    expansionPanelSummary: {
      borderColor: "blue"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    }
  });
});

export default function SimpleExpansionPanel() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={expanded === "project"}
        onChange={handleChange("project")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="project-content"
          id="project-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            Project
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SelectProject />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "building"}
        onChange={handleChange("building")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="building-content"
          id="building-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            Building
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SelectBuilding />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "start"}
        onChange={handleChange("start")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="start-content"
          id="start-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            Start Date/Time
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SelectStartDateTime />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "zone"}
        onChange={handleChange("zone")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="zone-content"
          id="zone-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            Zones
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SelectZone
            onZoneClick={(zone: string) => setExpanded(`zone-${zone}`)}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "zone-entrance"}
        onChange={handleChange("zone-entrance")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="zone-entrance-content"
          id="zone-entrance-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            Zone - Entrance
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ZoneActions
            initialValues={ZoneActionsInitialValues}
            validationSchema={ZoneActionsValidationSchema}
            onSubmit={zoneActionSubmitHandler}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "zone-sidewalks"}
        onChange={handleChange("zone-sidewalks")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="zone-sidewalks-content"
          id="zone-sidewalks-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            Zone - Sidewalks
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ZoneActions
            initialValues={ZoneActionsInitialValues}
            validationSchema={ZoneActionsValidationSchema}
            onSubmit={zoneActionSubmitHandler}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "zone-stepsStairs"}
        onChange={handleChange("zone-stepsStairs")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="zone-stepsstairs-content"
          id="zone-stepsstairs-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            Zone - Steps/Stairs
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ZoneActions
            initialValues={ZoneActionsInitialValues}
            validationSchema={ZoneActionsValidationSchema}
            onSubmit={zoneActionSubmitHandler}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "zone-ramps"}
        onChange={handleChange("zone-ramps")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="zone-ramps-content"
          id="zone-ramps-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            Zone - Ramps
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ZoneActions
            initialValues={ZoneActionsInitialValues}
            validationSchema={ZoneActionsValidationSchema}
            onSubmit={zoneActionSubmitHandler}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "end"}
        onChange={handleChange("end")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="end-content"
          id="end-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            End Date/Time
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SelectEndDateTime />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "comments"}
        onChange={handleChange("comments")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="comments-content"
          id="comments-header"
          className={classes.expansionPanelSummary}
        >
          <Typography color="primary" className={classes.heading}>
            Comments
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Comments />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
