import { check } from "express-validator";
import { resolver } from "./_resolver";

const validateBoat = [
  check("classId", "classId is a required String").notEmpty().isNumeric(),
  check("clubId", "clubId is a required String").notEmpty().isNumeric(),
  check("name", "name is a required String").notEmpty().isString(),
  check("sailNo", "sailNo is a required String").notEmpty().isString(),
  (req, res, next) => resolver(req, res, next),
];

export { validateBoat };
