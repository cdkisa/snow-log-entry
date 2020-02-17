const areasData = [
  {
    id: 1,
    label: "Steps/Stairs"
  },
  {
    id: 2,
    label: "Sidewalks"
  },
  {
    id: 3,
    label: "Entrance"
  },
  {
    id: 4,
    label: "Parking Lot"
  }
];

const actionsData = [
  {
    id: 1,
    label: "Sand"
  },
  {
    id: 2,
    label: "Ice Melt"
  },
  {
    id: 3,
    label: "Gravel"
  }
];

const choicesData = [
  {
    id: 1,
    label: "Yes"
  },
  {
    id: 2,
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
    return areasData.map(area => ({
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

  fetchAreas = async () => areasData;
  fetchArea = async id => areasData.find(x => x.id === id);

  fetchActions = async () => actionsData;
  fetchAction = async id => actionsData.find(x => x.id === id);

  fetchChoices = async () => choicesData;
  fetchChoice = async id => choicesData.find(x => x.id === id);

  fetchWeathers = async () => weatherData;
  fetchWeather = async id => weatherData.find(x => x.id === id);
}

export default new LogApi();
