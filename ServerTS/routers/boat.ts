import express from "express";
import { validateBoat } from "../middleware/validation/boat";
import {
  getBoats,
  getAllClasses,
  deleteBoat,
  updateBoat,
  postBoat,
  getBoatById,
} from "../controllers/boat";

const BoatRouter = express.Router();

BoatRouter.route("/").get(getBoats);
BoatRouter.get("/class", getAllClasses);
BoatRouter.route("/").post(validateBoat, postBoat);
BoatRouter.route("/:id").put(validateBoat, updateBoat);
BoatRouter.delete("/:id", deleteBoat);
BoatRouter.route("/:id").get(getBoatById);

export { BoatRouter };
