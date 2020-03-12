const zonesData = [
  {
    id: 1,
    name: "stepsStairs",
    label: "Steps/Stairs"
  },
  {
    id: 2,
    name: "sidewalks",
    label: "Sidewalks"
  },
  {
    id: 3,
    name: "entrance",
    label: "Entrance"
  },
  {
    id: 4,
    name: "ramps",
    label: "Ramps"
  }
];

const actionsData = [
  {
    id: 1,
    name: "sand",
    label: "Sand"
  },
  {
    id: 2,
    name: "iceMelt",
    label: "Ice Melt"
  },
  {
    id: 3,
    name: "gravel",
    label: "Gravel"
  }
];

const choicesData = [
  {
    id: 1,
    name: "yes",
    label: "Yes"
  },
  {
    id: 2,
    name: "no",
    label: "No"
  }
];

class LogApi {
  fetchZonesActionsChoices = async () => ({
    zonesData,
    actionsData,
    choicesData
  });

  fetchZones = async () => {
    return zonesData.map(area => ({
      ...area,
      actions: actionsData.map(action => ({
        ...action,
        choices: choicesData
      }))
    }));
  };

  fetchActionsAndChoices = async () => {
    return actionsData.map(action => ({
      ...action,
      choices: choicesData
    }));
  };

  fetchZones = async () => zonesData;
  fetchZone = async id => zonesData.find(x => x.id === id);

  fetchActions = async () => actionsData;
  fetchAction = async id => actionsData.find(x => x.id === id);

  fetchChoices = async () => choicesData;
  fetchChoice = async id => choicesData.find(x => x.id === id);
}

export default new LogApi();
