/*eslint no-template-curly-in-string: 0*/

import { isDate } from "date-fns";
import { object, string, number, date, DateSchema, TestOptions } from "yup";

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

export const SelectProjectValidationSchema = object({
  cityId: string().required("Please select a City"),
  projectId: string().required("Please select a Project")
});

export const SelectBuildingValidationSchema = object({
  buildingId: string().required("Please select a Building")
});

export const SelectStartDateTimeValidationSchema = object({
  startDate: nullableDateSchema("Start Date"),
  startTime: nullableDateSchema("Start Time").test(isIncrementOfFiveTest)
});

export const ZoneActionsValidationSchema = object({
  sand: number().min(1, "Please select an option"),
  gravel: number().min(1, "Please select an option"),
  iceMelt: number().min(1, "Please select an option")
});

export const CommentsValidationSchema = object({
  comments: string().max(500)
});

export default {
  SelectProjectValidationSchema,
  SelectBuildingValidationSchema,
  SelectStartDateTimeValidationSchema,
  ZoneActionsValidationSchema,
  CommentsValidationSchema
};
