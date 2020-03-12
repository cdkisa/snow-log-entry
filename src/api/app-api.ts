class AppApi {
  get buildingId(): string {
    const v = localStorage.getItem("buildingId");
    return v ? v : "";
  }
  set buildingId(value: string) {
    localStorage.setItem("buildingId", value);
  }

  get startDateTime(): string | null {
    return localStorage.getItem("startDateTime");
  }
  set startDateTime(value: string | null) {
    localStorage.setItem("startDateTime", value!);
  }

  get projectId(): string {
    const v = localStorage.getItem("projectId");
    return v ? v : "0";
  }
  set projectId(value: string) {
    localStorage.setItem("projectId", value);
  }

  get endDateTime(): string | null {
    return localStorage.getItem("endDateTime");
  }
  set endDateTime(value: string | null) {
    localStorage.setItem("endDateTime", value!);
  }
}

export default new AppApi();
