import express from "express";
import { validateClub } from "../middleware/validation/club";
import {
  getAllClubs,
  postClub,
  deleteClubController,
  updateClubController,
  getClubByIDController,
} from "../controllers/club";

const ClubRouter = express.Router();

ClubRouter.route("/").get(getAllClubs);
ClubRouter.route("/").post(validateClub, postClub);
ClubRouter.delete("/:id", deleteClubController);
ClubRouter.route("/:id").put(validateClub, updateClubController);
ClubRouter.route("/:id").get(getClubByIDController);

export { ClubRouter };
