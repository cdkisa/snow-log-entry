import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

class AppApi {
  get buildingId() {
    return localStorage.getItem("buildingId");
  }
  set buildingId(value: any) {
    localStorage.setItem("buildingId", value);
  }

  get startDateTime(): Date | null {
    const result = localStorage.getItem("startDateTime");
    console.log("get startDateTime", result);
    if (typeof result === "string" && result.length > 0) {
      return new Date(parseInt(result, 10));
    }
    return null;
  }
  set startDateTime(value: Date | null) {
    localStorage.setItem("startDateTime", value!.getTime().toString());
  }
}

export default new AppApi();
