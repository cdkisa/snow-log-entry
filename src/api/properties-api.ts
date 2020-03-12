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
    id: 100,
    cityId: 1,
    name: "Calgary Place"
  },
  {
    id: 200,
    cityId: 2,
    name: "Edmonton Place"
  },
  {
    id: 300,
    cityId: 3,
    name: "Regina Place"
  }
];

const buildingsData = [
  {
    id: 100,
    projectId: 100,
    name: "Calgary A Block"
  },
  {
    id: 101,
    projectId: 100,
    name: "Calgary B Block"
  },
  {
    id: 102,
    projectId: 100,
    name: "Calgary C Block"
  },
  {
    id: 103,
    projectId: 100,
    name: "Calgary D Block"
  },
  {
    id: 104,
    projectId: 100,
    name: "Calgary E Block"
  },
  {
    id: 105,
    projectId: 100,
    name: "Calgary F Block"
  },
  {
    id: 106,
    projectId: 100,
    name: "Calgary G Block"
  },
  {
    id: 107,
    projectId: 100,
    name: "Calgary H Block"
  },
  {
    id: 108,
    projectId: 100,
    name: "Calgary I Block"
  },
  {
    id: 109,
    projectId: 100,
    name: "Calgary J Block"
  },
  {
    id: 110,
    projectId: 100,
    name: "Calgary K Block"
  },
  {
    id: 111,
    projectId: 100,
    name: "Calgary L Block"
  },
  {
    id: 112,
    projectId: 100,
    name: "Calgary M Block"
  },
  {
    id: 113,
    projectId: 100,
    name: "Calgary N Block"
  },
  {
    id: 115,
    projectId: 100,
    name: "Calgary O Block"
  },
  {
    id: 116,
    projectId: 100,
    name: "Calgary P Block"
  },
  {
    id: 117,
    projectId: 100,
    name: "Calgary Q Block"
  },
  {
    id: 118,
    projectId: 100,
    name: "Calgary R Block"
  },
  {
    id: 119,
    projectId: 100,
    name: "Calgary S Block"
  },
  {
    id: 120,
    projectId: 100,
    name: "Calgary T Block"
  },
  {
    id: 121,
    projectId: 100,
    name: "Calgary U Block"
  },
  {
    id: 122,
    projectId: 100,
    name: "Calgary V Block"
  },
  {
    id: 123,
    projectId: 100,
    name: "Calgary W Block"
  },
  {
    id: 124,
    projectId: 100,
    name: "Calgary X Block"
  },
  {
    id: 125,
    projectId: 100,
    name: "Calgary Y Block"
  },
  {
    id: 126,
    projectId: 100,
    name: "Calgary Z Block"
  },
  {
    id: 3,
    projectId: 200,
    name: "Edmonton A Block"
  },
  {
    id: 4,
    projectId: 300,
    name: "Regina West"
  },
  {
    id: 5,
    projectId: 300,
    name: "Regina East"
  }
];

class PropertiesApi {
  fetchCountries = async () => countriesData;

  fetchProvinces = async countryId =>
    provincesData.filter(x => x.countryId === countryId);

  fetchCities = async () => citiesData;

  fetchCitiesByProvince = async provinceId =>
    citiesData.filter(x => x.provinceId === provinceId);

  fetchProjectsByCity = async cityId =>
    projectsData.filter(x => x.cityId === cityId);

  fetchCityProjectHierarchy = async () =>
    citiesData.map(p => ({
      ...p,
      projects: projectsData.filter(x => x.cityId === p.id)
    }));

  fetchProjectHierarchy = async () =>
    projectsData.map(p => ({
      ...p,
      buildings: buildingsData.filter(x => x.projectId === p.id)
    }));

  fetchProjecsBuildingsByProject = async id => {
    const project = projectsData.find(p => p.id === parseInt(id, 10));

    return {
      ...project,
      buildings: buildingsData.filter(x => x.projectId === project.id)
    };
  };

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
