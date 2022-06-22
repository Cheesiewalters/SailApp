import { check } from "express-validator";
import { resolver } from "./_resolver";

const validateClub = [
  check("name", "name is a required Field").notEmpty().isString(),

  (req, res, next) => resolver(req, res, next),
];

export { validateClub };
