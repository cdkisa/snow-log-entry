const countriesData = [
  {
    id: 1,
    name: "Canada"
  }
];

const provincesData = [
  {
    id: 1,
    countryId: 1,
    name: "Alberta"
  },
  {
    id: 2,
    countryId: 1,
    name: "Saskatchewan"
  }
];

const citiesData = [
  {
    id: 1,
    provinceId: 1,
    name: "Calgary"
  },
  {
    id: 2,
    provinceId: 1,
    name: "Edmonton"
  },
  {
    id: 3,
    provinceId: 2,
    name: "Regina"
  }
];

const projectsData = [
  {
    id: 1,
    cityId: 1,
    name: "Calgary Place"
  },
  {
    id: 2,
    cityId: 2,
    name: "Edmonton Place"
  },
  {
    id: 3,
    cityId: 3,
    name: "Regina Place"
  }
];

const buildingsData = [
  {
    id: 1,
    projectId: 1,
    name: "A Block"
  },
  {
    id: 2,
    projectId: 1,
    name: "B Block"
  },
  {
    id: 3,
    projectId: 2,
    name: "A Block"
  },
  {
    id: 4,
    projectId: 3,
    name: "Regina West"
  },
  {
    id: 5,
    projectId: 3,
    name: "Regina East"
  }
];

class PropertiesApi {
  fetchCountries = async () => countriesData;

  fetchProvinces = async countryId =>
    provincesData.filter(x => x.countryId === countryId);

  fetchCities = async provinceId =>
    citiesData.filter(x => x.provinceId === provinceId);

  fetchProjects = async cityId => projectsData.filter(x => x.cityId === cityId);

  fetchProjectHierarchy = async () =>
    projectsData.map(p => ({
      ...p,
      buildings: buildingsData.filter(x => x.projectId === p.id)
    }));

  fetchBuildings = async projectId =>
    buildingsData.filter(x => x.projectId === projectId);

  fetchBuilding = async buildingId =>
    buildingsData.filter(x => x.buildingId === buildingId);

  fetchLocation = async buildingId => {
    const building = buildingsData.find(x => x.id === parseInt(buildingId, 10));
    const project = projectsData.find(x => x.id === building.projectId);
    const city = citiesData.find(x => x.id === project.cityId);
    const province = provincesData.find(x => x.id === city.provinceId);
    const country = countriesData.find(x => x.id === province.countryId);

    return {
      building,
      project,
      city,
      province,
      country
    };
  };
}

export default new PropertiesApi();
