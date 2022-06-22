import { Request, Response } from "express";
import { EventService } from "../services";

const okStatus = 200;

async function getAllEvents(req: Request, res: Response) {
  const classes = await EventService.getAllEventsService();
  const noContent = !classes || classes.length < 1;
  if (noContent) return res.sendStatus(204);
  return res.status(okStatus).json(classes);
}

async function getEventTypes(req: Request, res: Response) {
  const events = await EventService.getAllEventTypes();
  if (!events || events.length === 0) return res.sendStatus(204);
  res.status(okStatus).json(events);
}

async function getEventById(req: Request, res: Response) {
  const event = await EventService.getEventByID(Number(req.params.id));
  if (!event || event.length === 0) return res.sendStatus(204);
  res.status(okStatus).json(event);
}

async function postEvent(req: Request, res: Response) {
  const newEvent = await EventService.postEventService(req.body);
  if (!newEvent || newEvent.id >= 0) return res.sendStatus(204);
  res.status(okStatus).json(newEvent);
}

async function updateEvent(req: Request, res: Response) {
  const updatedEvent = await EventService.updateEventService(
    req,
    Number(req.params.id)
  );
  if (!updatedEvent || updatedEvent.id >= 0) return res.sendStatus(400);
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
  if (!events || events.length === 0) return res.sendStatus(400);
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
