import express from "express";
import {
  validateRace,
  validatePostRace,
  validatePostRaceBoat,
} from "../middleware/validation/race";
import {
  getAllRaces,
  postRace,
  deleteRace,
  updateRace,
  getRaceByID,
  postRaceBoats,
  getAllRaceBoatsByID,
  deleteAllRaceBoatsById,
  updateRaceBoatByBoatId,
  getRaceBoatByBoatId,
} from "../controllers/race";

const RaceRouter = express.Router();

RaceRouter.route("/:id/boat").post(validatePostRace, postRaceBoats);
RaceRouter.route("/:id/boat").get(getAllRaceBoatsByID);
RaceRouter.delete("/:id/boat/:id2", deleteAllRaceBoatsById);
RaceRouter.route("/:id/boat/").put(validateRace, updateRaceBoatByBoatId);
RaceRouter.get("/:id/boat/:id2", getRaceBoatByBoatId);
RaceRouter.get("/", getAllRaces);
RaceRouter.route("/").post(validatePostRaceBoat, postRace);
RaceRouter.delete("/:id", deleteRace);
RaceRouter.route("/:id").put(validatePostRaceBoat, updateRace);
RaceRouter.get("/:id", getRaceByID);

export { RaceRouter };
