import express from "express";
import { validateEvent } from "../middleware/validation/event";
import {
  getEventTypes,
  getAllEvents,
  getEventById,
  deleteEventController,
  updateEvent,
  postEvent,
  searchEventController,
} from "../controllers/event";

const EventRouter = express.Router();

EventRouter.route("/").get(getAllEvents);
EventRouter.route("/types").get(getEventTypes);
EventRouter.route("/search/").get(searchEventController);
EventRouter.get("/:id", getEventById);
EventRouter.route("/").post(validateEvent, postEvent);
EventRouter.delete("/:id", deleteEventController);
EventRouter.route("/:id").put(validateEvent, updateEvent);
export { EventRouter };
