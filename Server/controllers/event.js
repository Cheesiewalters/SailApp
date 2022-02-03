const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getAllEventTypes,
	getAllEvents,
	getEventByID,
	postEvent,
	updateEventService,
	deleteEvent,
	searchEvent,
} = require("../services/event");
const okStatus = 200;
const serverErrorStatus = 500;

const getEventTypes = async (req, res) => {
	const eventTypes = await getAllEventTypes();
	if (!eventTypes || eventTypes.length === 0) return res.sendStatus(204);

	res.status(okStatus).json(eventTypes);
};

const getAllEventsController = async (req, res) => {
	const events = await getAllEvents();
	if (!events || events.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(events);
};

const getEventByIDController = async (req, res) => {
	const event = await getEventByID(req.params.id);
	if (!event || event.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(event);
};

const postEventController = async (req, res) => {
	const newEvent = await postEvent(req);
	if (!newEvent || newEvent.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(newEvent);
};

const updateEvent = async (req, res) => {
	const updatedEvent = await updateEventService(req);
	if (!updatedEvent || updatedEvent.length === 0) return res.sendStatus(400);
	res.status(okStatus).json(updatedEvent);
};

const deleteEventController = async (req, res) => {
	const deletedEvent = await deleteEvent(req.params.id);
	if (!deletedEvent || deletedEvent.length === 0) return res.sendStatus(500);
	res.status(okStatus).json({
		message: `Successfully deleted event with id: ${req.params.id}`,
	});
};

const searchEventController = async (req, res) => {
	const events = await searchEvent(req.query.q);
	if (!events || events.length === 0) return res.sendStatus(400);
	res.status(okStatus).json(events);
};

module.exports = {
	getEventTypes,
	getAllEventsController,
	getEventByIDController,
	postEventController,
	updateEvent,
	deleteEventController,
	searchEventController,
};
