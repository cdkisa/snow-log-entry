import { IFormikWizardStep } from "../formik-wizard/FormikWizardTypes";
import {
  object,
  string,
  date,
  number,
  TestOptions,
  Schema,
  DateSchema
} from "yup";
import { isDate, differenceInMinutes } from "date-fns";
import Home from "./forms/Home";
import Where from "./forms/Where";
import When from "./forms/When";
import Comments from "./forms/Comments";
import Zone from "./forms/Zone";
import WhereReview from "./reviews/WhereReview";
import WhenReview from "./reviews/WhenReview";
import CommentsReview from "./reviews/CommentsReview";
import ZoneReview from "./reviews/ZoneReview";
import SummaryInfo from "./forms/SummaryInfo";
import appState from "../../api/app-api";

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

const getSteps = (): IFormikWizardStep[] => {
  return [
    {
      id: "home",
      component: Home,
      keepValuesOnPrevious: true,
      onAction: onAfterFormValidateAndSubmit
    },

    {
      id: "where",
      stepTitle: "Where did you work?",
      component: Where,
      reviewComponent: WhereReview,
      keepValuesOnPrevious: true,
      onAction: onAfterFormValidateAndSubmit,
      formikProps: {
        initialValues: {
          buildingId: appState.buildingId | 0
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
      keepValuesOnPrevious: true,
      formikProps: {
        initialValues: {
          startDateTime: appState.startDateTime,
          endDateTime: null
        },
        validationSchema: object({
          startDateTime: nullableDateSchema("Start Date/Time").test(
            isIncrementOfFiveTest
          ),
          endDateTime: nullableDateSchema("End Date/Time")
            .test(isIncrementOfFiveTest)
            .when(
              "startDateTime",
              (startDateTime: Date, schema: Schema<any>) => {
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
              }
            )
        })
      },
      onAction: onAfterFormValidateAndSubmit
    },

    {
      id: "stepsStairs",
      stepTitle: "Steps/Stairs",
      component: Zone,
      reviewComponent: ZoneReview,
      keepValuesOnPrevious: true,
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

    {
      id: "sidewalks",
      stepTitle: "Sidewalks",
      component: Zone,
      reviewComponent: ZoneReview,
      keepValuesOnPrevious: true,
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

    {
      id: "entrance",
      stepTitle: "Entrance",
      component: Zone,
      reviewComponent: ZoneReview,
      keepValuesOnPrevious: true,
      onAction: onAfterFormValidateAndSubmit,
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
      }
    },

    {
      id: "parkingLot",
      stepTitle: "Parking Lot",
      component: Zone,
      reviewComponent: ZoneReview,
      keepValuesOnPrevious: true,
      onAction: onAfterFormValidateAndSubmit,
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
      }
    },

    {
      id: "comment",
      stepTitle: "Comments",
      component: Comments,
      reviewComponent: CommentsReview,
      keepValuesOnPrevious: true,
      onAction: onAfterFormValidateAndSubmit,
      formikProps: {
        initialValues: {
          comments: ""
        },
        validationSchema: object({
          comments: string().max(500)
        })
      }
    },

    {
      id: "summary",
      stepTitle: "Please review what you have entered",
      component: SummaryInfo,
      keepValuesOnPrevious: true,
      onAction: onAfterFormValidateAndSubmit
    }
  ];
};

const stepDefinitions = getSteps();
console.log("getSteps", stepDefinitions);
export default stepDefinitions;
