import { object, date, number } from "yup";
import { isDate, differenceInMinutes } from "date-fns";
import Where from "./views/Where";
import WhereReview from "./views/WhereReview";
import When from "./views/When";
import WhenReview from "./views/WhenReview";
import Weather from "./views/Weather";
import WeatherReview from "./views/WeatherReview";
import Zone from "./views/Zone";
import ZoneReview from "./views/ZoneReview";
import SummaryInfo from "./views/SummaryInfo";

const nullableDateSchema = label =>
  date()
    .label(label)
    .nullable()
    .required(`${label} is required`);

const isIncrementOfFiveTest = {
  name: "is-increment-of-five",
  test: value => isDate(value) && value.getMinutes() % 5 === 0,
  message: "${path} must be in increments of 5 minutes",
  exclusive: true
};

const onAfterFormValidateAndSubmit = formValues =>
  console.log("form values:", formValues);

export default [
  {
    id: "where",
    stepTitle: "Where did you work?",
    component: Where,
    reviewComponent: WhereReview,
    initialValues: {
      buildingId: 0
    },
    validationSchema: object({
      buildingId: number().min(1, "Please select a location")
    }),
    onAction: onAfterFormValidateAndSubmit
  },

  {
    id: "when",
    stepTitle: "When did you work?",
    component: When,
    reviewComponent: WhenReview,
    initialValues: {
      startDateTime: null,
      endDateTime: null
    },
    validationSchema: object({
      startDateTime: nullableDateSchema("Start Date/Time").test(
        isIncrementOfFiveTest
      ),
      endDateTime: nullableDateSchema("End Date/Time")
        .test(isIncrementOfFiveTest)
        .when("startDateTime", (startDateTime, schema) => {
          if (isDate(startDateTime)) {
            const MinDifferenceInMinutes = 5;

            return schema.test({
              name: "difference",
              params: {
                startDateTime,
                startDateLabel: "Start Date",
                MinDifferenceInMinutes
              },
              message:
                "${path} must at least ${MinDifferenceInMinutes} minutes after ${startDateLabel}",
              test: endDateTime =>
                differenceInMinutes(endDateTime, startDateTime) >=
                MinDifferenceInMinutes
            });
          }
        })
    }),
    onAction: onAfterFormValidateAndSubmit
  },

  {
    id: "weather",
    stepTitle: "What was the weather like?",
    component: Weather,
    reviewComponent: WeatherReview,
    initialValues: {
      priorWeatherId: 0,
      duringWeatherId: 0
    },
    validationSchema: object({
      priorWeatherId: number().min(1, "Weather Required"),
      duringWeatherId: number().min(1, "Weather Required")
    }),
    onAction: onAfterFormValidateAndSubmit
  },

  {
    id: "stepsStairs",
    stepTitle: "What did you do for Steps/Stairs?",
    component: Zone,
    reviewComponent: ZoneReview,
    initialValues: {
      sand: 0,
      gravel: 0,
      iceMelt: 0
    },
    validationSchema: object({
      sand: number().min(1, "Please select an option"),
      gravel: number().min(1, "Please select an option"),
      iceMelt: number().min(1, "Please select an option")
    }),
    onAction: onAfterFormValidateAndSubmit
  },

  {
    id: "sidewalks",
    stepTitle: "What did you do for Sidewalks?",
    component: Zone,
    reviewComponent: ZoneReview,
    initialValues: {
      sand: 0,
      gravel: 0,
      iceMelt: 0
    },
    validationSchema: object({
      sand: number().min(1, "Please select an option"),
      gravel: number().min(1, "Please select an option"),
      iceMelt: number().min(1, "Please select an option")
    }),
    onAction: onAfterFormValidateAndSubmit
  },

  {
    id: "entrance",
    stepTitle: "What did you do for Entrance?",
    component: Zone,
    reviewComponent: ZoneReview,
    initialValues: {
      sand: 0,
      gravel: 0,
      iceMelt: 0
    },
    validationSchema: object({
      sand: number().min(1, "Please select an option"),
      gravel: number().min(1, "Please select an option"),
      iceMelt: number().min(1, "Please select an option")
    }),
    onAction: onAfterFormValidateAndSubmit
  },

  {
    id: "parkingLot",
    stepTitle: "What did you do for Parking Lot?",
    component: Zone,
    reviewComponent: ZoneReview,
    initialValues: {
      sand: 0,
      gravel: 0,
      iceMelt: 0
    },
    validationSchema: object({
      sand: number().min(1, "Please select an option"),
      gravel: number().min(1, "Please select an option"),
      iceMelt: number().min(1, "Please select an option")
    }),
    onAction: onAfterFormValidateAndSubmit
  },

  {
    id: "summary",
    stepTitle: "Please review what you have entered",
    component: SummaryInfo,
    onAction: onAfterFormValidateAndSubmit
  }
];
