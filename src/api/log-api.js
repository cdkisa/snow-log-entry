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
    name: "parkingLot",
    label: "Parking Lot"
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

const weatherData = [
  {
    id: 1,
    label: "Snow"
  },
  {
    id: 2,
    label: "Rain"
  },
  {
    id: 3,
    label: "Freezing Rain"
  },
  {
    id: 4,
    label: "No precipitation"
  }
];

class LogApi {
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

  fetchAreas = async () => zonesData;
  fetchArea = async id => zonesData.find(x => x.id === id);

  fetchActions = async () => actionsData;
  fetchAction = async id => actionsData.find(x => x.id === id);

  fetchChoices = async () => choicesData;
  fetchChoice = async id => choicesData.find(x => x.id === id);

  fetchWeathers = async () => weatherData;
  fetchWeather = async id => weatherData.find(x => x.id === id);
}

export default new LogApi();
