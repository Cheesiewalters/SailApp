const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getAllEventTypes,
	getAllEventsService,
	getEventByIDService,
	postEventService,
	updateEventService,
	deleteEventService,
	searchEventService,
} = require("../services/event");
const okStatus = 200;
const serverErrorStatus = 500;

const getEventTypes = async (req, res) => {
	const eventTypes = await getAllEventTypes();
	if (!eventTypes || eventTypes.length === 0) return res.sendStatus(204);

	res.status(okStatus).json(eventTypes);
};

const getAllEvents = async (req, res) => {
	const events = await getAllEventsService();
	if (!events || events.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(events);
};

const getEventByID = async (req, res) => {
	const event = await getEventByIDService(req.params.id);
	if (!event || event.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(event);
};

const postEvent = async (req, res) => {
	const newEvent = await postEventService(req);
	if (!newEvent || newEvent.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(newEvent);
};

const updateEvent = async (req, res) => {
	const updatedEvent = await updateEventService(req);
	if (!updatedEvent || updatedEvent.length === 0) return res.sendStatus(400);
	res.status(okStatus).json(updatedEvent);
};

const deleteEvent = async (req, res) => {
	const deletedEvent = await deleteEventService(req.params.id);
	if (!deletedEvent || deletedEvent.length === 0) return res.sendStatus(500);
	res.status(okStatus).json({
		message: `Successfully deleted event with id: ${req.params.id}`,
	});
};

const searchEvent = async (req, res) => {
	const events = await searchEventService(req.query.q);
	if (!events || events.length === 0) return res.sendStatus(400);
	res.status(okStatus).json(events);
};

module.exports = {
	getEventTypes,
	getAllEvents,
	getEventByID,
	postEvent,
	updateEvent,
	deleteEvent,
	searchEvent,
};
