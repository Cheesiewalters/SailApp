import { check } from "express-validator";
import { resolver } from "./_resolver";

const validateEvent = [
  check("eventTypeId", "eventTypeId is a required String")
    .notEmpty()
    .isNumeric(),
  check("startTime", "startTime is a required String").notEmpty().isISO8601(),
  check("endDate", "name is a required String").notEmpty().isISO8601(),
  check("name", "name is a required String").notEmpty().isString(),
  check("description", "notes is an optional String").notEmpty().isString(),
  (req, res, next) => resolver(req, res, next),
];

export { validateEvent };
