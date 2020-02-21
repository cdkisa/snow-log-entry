import { IFormikWizardStep } from "../formik-wizard/FormikWizardTypes";
import { object, date, number, TestOptions, Schema, DateSchema } from "yup";
import { isDate, differenceInMinutes } from "date-fns";
import Where from "./forms/Where";
import When from "./forms/When";
import Weather from "./forms/Weather";
import Zone from "./forms/Zone";
import WhereReview from "./reviews/WhereReview";
import WhenReview from "./reviews/WhenReview";
import WeatherReview from "./reviews/WeatherReview";
import ZoneReview from "./reviews/ZoneReview";

import SummaryInfo from "./forms/SummaryInfo";

const nullableDateSchema = (label: string): DateSchema<Date | null> =>
  date()
    .label(label)
    .nullable()
    .required(`${label} is required`);

const isIncrementOfFiveTest: TestOptions = {
  name: "is-increment-of-five",
  test: value => isDate(value) && value.getMinutes() % 5 === 0,
  message: "${path} must be in increments of 5 minutes",
  exclusive: true
};

const onAfterFormValidateAndSubmit = async (
  sectionValues: any,
  formValues: any
) => {
  console.log("form values:", formValues);
};

const stepDefinitions: IFormikWizardStep[] = [
  {
    id: "where",
    stepTitle: "Where did you work?",
    component: Where,
    reviewComponent: WhereReview,
    onAction: onAfterFormValidateAndSubmit,
    formikProps: {
      initialValues: {
        buildingId: 0
      },
      validationSchema: object({
        buildingId: number().min(1, "Please select a location")
      })
    }
  },

  {
    id: "when",
    stepTitle: "When did you work?",
    component: When,
    reviewComponent: WhenReview,
    formikProps: {
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
          .when("startDateTime", (startDateTime: Date, schema: Schema<any>) => {
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
                test: (endDateTime: Date) =>
                  differenceInMinutes(endDateTime, startDateTime) >=
                  MinDifferenceInMinutes
              });
            }
            return schema;
          })
      })
    },
    onAction: onAfterFormValidateAndSubmit
  },

  {
    id: "weather",
    stepTitle: "What was the weather like?",
    component: Weather,
    reviewComponent: WeatherReview,
    formikProps: {
      initialValues: {
        priorWeatherId: 0,
        duringWeatherId: 0
      },
      validationSchema: object({
        priorWeatherId: number().min(1, "Weather Required"),
        duringWeatherId: number().min(1, "Weather Required")
      })
    },
    onAction: onAfterFormValidateAndSubmit
  },

  {
    id: "stepsStairs",
    stepTitle: "What did you do for Steps/Stairs?",
    component: Zone,
    reviewComponent: ZoneReview,
    formikProps: {
      initialValues: {
        sand: 0,
        gravel: 0,
        iceMelt: 0
      },
      validationSchema: object({
        sand: number().min(1, "Please select an option"),
        gravel: number().min(1, "Please select an option"),
        iceMelt: number().min(1, "Please select an option")
      })
    },
    onAction: onAfterFormValidateAndSubmit
  },

  // {
  //   id: "sidewalks",
  //   stepTitle: "What did you do for Sidewalks?",
  //   component: Zone,
  //   reviewComponent: ZoneReview,
  //   formikProps: {
  //     initialValues: {
  //       sand: 0,
  //       gravel: 0,
  //       iceMelt: 0
  //     },
  //     validationSchema: object({
  //       sand: number().min(1, "Please select an option"),
  //       gravel: number().min(1, "Please select an option"),
  //       iceMelt: number().min(1, "Please select an option")
  //     })
  //   },
  //   onAction: onAfterFormValidateAndSubmit
  // },

  // {
  //   id: "entrance",
  //   stepTitle: "What did you do for Entrance?",
  //   component: Zone,
  //   reviewComponent: ZoneReview,
  //   onAction: onAfterFormValidateAndSubmit,
  //   formikProps: {
  //     initialValues: {
  //       sand: 0,
  //       gravel: 0,
  //       iceMelt: 0
  //     },
  //     validationSchema: object({
  //       sand: number().min(1, "Please select an option"),
  //       gravel: number().min(1, "Please select an option"),
  //       iceMelt: number().min(1, "Please select an option")
  //     })
  //   }
  // },

  // {
  //   id: "parkingLot",
  //   stepTitle: "What did you do for Parking Lot?",
  //   component: Zone,
  //   reviewComponent: ZoneReview,
  //   onAction: onAfterFormValidateAndSubmit,
  //   formikProps: {
  //     initialValues: {
  //       sand: 0,
  //       gravel: 0,
  //       iceMelt: 0
  //     },
  //     validationSchema: object({
  //       sand: number().min(1, "Please select an option"),
  //       gravel: number().min(1, "Please select an option"),
  //       iceMelt: number().min(1, "Please select an option")
  //     })
  //   }
  // },

  {
    id: "summary",
    stepTitle: "Please review what you have entered",
    component: SummaryInfo,
    onAction: onAfterFormValidateAndSubmit
  }
];

export default stepDefinitions;
