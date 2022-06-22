import { check } from "express-validator";
import { resolver } from "./_resolver";

const validateAuth = [
  check("email", "name is a required String").notEmpty().isString(),
  check("password", "name is a required String").notEmpty().isString(),

  (req, res, next) => resolver(req, res, next),
];

export { validateAuth };
