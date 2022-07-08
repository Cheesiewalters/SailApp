import { Request, Response } from "express";
import { EventService } from "../services";

const okStatus = 200;

async function getAllEvents(req: Request, res: Response) {
  const events = await EventService.getAllEventsService();
  return res.status(okStatus).json(events);
}

async function getEventTypes(req: Request, res: Response) {
  const events = await EventService.getAllEventTypes();
  res.status(okStatus).json(events);
}

async function getEventById(req: Request, res: Response) {
  const event = await EventService.getEventByID(Number(req.params.id));
  res.status(okStatus).json(event);
}

async function postEvent(req: Request, res: Response) {
  const newEvent = await EventService.postEventService(req.body);

  res.status(okStatus).json(newEvent);
}

async function updateEvent(req: Request, res: Response) {
  const updatedEvent = await EventService.updateEventService(
    req.body,
    Number(req.params.id)
  );

  res.status(okStatus).json(updatedEvent);
}

async function deleteEventController(req: Request, res: Response) {
  await EventService.deleteEvent(Number(req.params.id));

  res.status(okStatus).json({
    message: `Successfully deleted event with id: ${req.params.id}`,
  });
}

async function searchEventController(req: Request, res: Response) {
  const events = await EventService.searchEvent(String(req.query.q));

  res.status(okStatus).json(events);
}

export {
  getAllEvents,
  getEventTypes,
  searchEventController,
  getEventById,
  postEvent,
  deleteEventController,
  updateEvent,
};
