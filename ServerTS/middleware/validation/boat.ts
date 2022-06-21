import { check } from "express-validator";
import { resolver } from "./_resolver";

const validateBoat = [
  check("classId", "name is a required String").notEmpty().isNumeric(),
  check("clubId", "name is a required String").notEmpty().isNumeric(),
  check("name", "name is a required String").notEmpty().isString(),

  check("sailNo", "notes is an optional String").notEmpty().isString(),
  (req, res, next) => resolver(req, res, next),
];

export { validateBoat };
