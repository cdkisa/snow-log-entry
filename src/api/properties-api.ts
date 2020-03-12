interface IKeyValue {
  id: number;
  parentId: number;
  name: string;
}

interface IKeyValueWithParent extends IKeyValue {
  parentId: number;
}

interface IKeyValueHierarchy {
  parent: IKeyValueWithParent;
  children: IKeyValueWithParent[];
}

interface ILocation {
  building: IKeyValueWithParent;
  project: IKeyValueWithParent;
  city: IKeyValueWithParent;
  province: IKeyValueWithParent;
}

const provincesData: IKeyValueWithParent[] = [
  {
    id: 1,
    parentId: 1,
    name: "Alberta"
  },
  {
    id: 2,
    parentId: 1,
    name: "Saskatchewan"
  }
];

const citiesData: IKeyValueWithParent[] = [
  {
    id: 1,
    parentId: 1,
    name: "Calgary"
  },
  {
    id: 2,
    parentId: 1,
    name: "Edmonton"
  },
  {
    id: 3,
    parentId: 2,
    name: "Regina"
  }
];

const projectsData: IKeyValueWithParent[] = [
  {
    id: 100,
    parentId: 1,
    name: "Calgary Place"
  },
  {
    id: 200,
    parentId: 2,
    name: "Edmonton Place"
  },
  {
    id: 300,
    parentId: 3,
    name: "Regina Place"
  }
];

const buildingsData: IKeyValueWithParent[] = [
  {
    id: 100,
    parentId: 100,
    name: "Calgary A Block"
  },
  {
    id: 101,
    parentId: 100,
    name: "Calgary B Block"
  },
  {
    id: 102,
    parentId: 100,
    name: "Calgary C Block"
  },
  {
    id: 103,
    parentId: 100,
    name: "Calgary D Block"
  },
  {
    id: 104,
    parentId: 100,
    name: "Calgary E Block"
  },
  {
    id: 105,
    parentId: 100,
    name: "Calgary F Block"
  },
  {
    id: 106,
    parentId: 100,
    name: "Calgary G Block"
  },
  {
    id: 107,
    parentId: 100,
    name: "Calgary H Block"
  },
  {
    id: 108,
    parentId: 100,
    name: "Calgary I Block"
  },
  {
    id: 109,
    parentId: 100,
    name: "Calgary J Block"
  },
  {
    id: 110,
    parentId: 100,
    name: "Calgary K Block"
  },
  {
    id: 111,
    parentId: 100,
    name: "Calgary L Block"
  },
  {
    id: 112,
    parentId: 100,
    name: "Calgary M Block"
  },
  {
    id: 113,
    parentId: 100,
    name: "Calgary N Block"
  },
  {
    id: 115,
    parentId: 100,
    name: "Calgary O Block"
  },
  {
    id: 116,
    parentId: 100,
    name: "Calgary P Block"
  },
  {
    id: 117,
    parentId: 100,
    name: "Calgary Q Block"
  },
  {
    id: 118,
    parentId: 100,
    name: "Calgary R Block"
  },
  {
    id: 119,
    parentId: 100,
    name: "Calgary S Block"
  },
  {
    id: 120,
    parentId: 100,
    name: "Calgary T Block"
  },
  {
    id: 121,
    parentId: 100,
    name: "Calgary U Block"
  },
  {
    id: 122,
    parentId: 100,
    name: "Calgary V Block"
  },
  {
    id: 123,
    parentId: 100,
    name: "Calgary W Block"
  },
  {
    id: 124,
    parentId: 100,
    name: "Calgary X Block"
  },
  {
    id: 125,
    parentId: 100,
    name: "Calgary Y Block"
  },
  {
    id: 126,
    parentId: 100,
    name: "Calgary Z Block"
  },
  {
    id: 3,
    parentId: 200,
    name: "Edmonton A Block"
  },
  {
    id: 4,
    parentId: 300,
    name: "Regina West"
  },
  {
    id: 5,
    parentId: 300,
    name: "Regina East"
  }
];

class PropertiesApi {
  fetchProvinces = async (): Promise<IKeyValueWithParent[]> => provincesData;

  fetchProvince = async (
    id: number
  ): Promise<IKeyValueWithParent | undefined> =>
    provincesData.find((x: IKeyValueWithParent) => x.id === id);

  fetchCities = async (): Promise<IKeyValueWithParent[]> => citiesData;

  fetchCity = async (id: number): Promise<IKeyValueWithParent | undefined> =>
    citiesData.find((x: IKeyValueWithParent) => x.id === id);

  fetchCitiesByProvince = async (
    id: number
  ): Promise<IKeyValueWithParent[] | undefined> =>
    citiesData.filter(x => x.parentId === id);

  fetchProjects = async (): Promise<IKeyValueWithParent[]> => projectsData;

  fetchProject = async (id: number): Promise<IKeyValueWithParent | undefined> =>
    projectsData.find((x: IKeyValueWithParent) => x.id === id);

  fetchProjectsByCity = async (
    id: number
  ): Promise<IKeyValueWithParent[] | undefined> =>
    projectsData.filter(x => x.parentId === id);

  fetchBuildings = async (): Promise<IKeyValueWithParent[]> => buildingsData;

  fetchBuilding = async (
    id: number
  ): Promise<IKeyValueWithParent | undefined> =>
    buildingsData.find((x: IKeyValueWithParent) => x.id === id);

  fetchBuildingsByProject = async (
    id: number
  ): Promise<IKeyValueWithParent[] | undefined> =>
    buildingsData.filter(x => x.parentId === id);

  fetchCityProjectHierarchy = async (): Promise<IKeyValueHierarchy[]> =>
    citiesData.map((p: IKeyValueWithParent) => ({
      parent: p,
      children: projectsData.filter(x => x.parentId === p.id)
    }));

  fetchProjectBuildingHierarchy = async (): Promise<IKeyValueHierarchy[]> =>
    projectsData.map((p: IKeyValueWithParent) => ({
      parent: p,
      children: buildingsData.filter(x => x.parentId === p.id)
    }));

  fetchProjectBuildingsByProject = async (
    id: number
  ): Promise<IKeyValueHierarchy> => {
    const project = projectsData.find((p: IKeyValueWithParent) => p.id === id);

    if (!project) throw Error(`Could not find project with id: ${id}`);

    return {
      parent: project,
      children: buildingsData.filter(x => x.parentId === id)
    };
  };

  fetchLocation = async (buildingId: number): Promise<ILocation> => {
    const building = buildingsData.find(x => x.id === buildingId);

    if (!building)
      throw Error(`Could not find building with id: ${buildingId}`);

    const project = projectsData.find(x => x.id === building.parentId);

    if (!project)
      throw Error(
        `Could not find projects associated to building with id: ${buildingId}`
      );

    const city = citiesData.find(x => x.id === project.parentId);

    if (!city)
      throw Error(
        `Could not find cities associated to building with id: ${buildingId}`
      );

    const province = provincesData.find(x => x.id === city.parentId);

    if (!province)
      throw Error(
        `Could not find province associated to building with id: ${buildingId}`
      );

    return {
      building,
      project,
      city,
      province
    };
  };
}

export default new PropertiesApi();
