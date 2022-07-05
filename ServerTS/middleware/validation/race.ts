import { check } from "express-validator";
import { resolver } from "./_resolver";

const validateRace = [
  check("startTime", "startTime is a required Field").notEmpty().isISO8601(),
  check("finishTime", "startTime is a required Field").notEmpty().isISO8601(),
  check("position", "position is a required Field").notEmpty().isNumeric(),
  check("boatId", "name is a required String").notEmpty().isNumeric(),

  (req, res, next) => resolver(req, res, next),
];

const validatePostRace = [
  check("startTime", "startTime is a required Field").notEmpty().isISO8601(),
  check("finishTime", "startTime is a required Field").notEmpty().isISO8601(),
  check("position", "position is a required Field").notEmpty().isString(),
];

const validatePostRaceBoat = [
  check("startTime", "startTime is a required Field").notEmpty().isISO8601(),
  check("classId", "position is a required Field").notEmpty().isNumeric(),
  check("eventId", "name is a required String").notEmpty().isNumeric(),

  (req, res, next) => resolver(req, res, next),
];

export { validateRace, validatePostRace, validatePostRaceBoat };
