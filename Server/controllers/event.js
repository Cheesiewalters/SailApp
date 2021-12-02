const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getAllEventTypes,
	getAllEventsService,
	getEventByIDService,
	postEventService,
	updateEventService,
} = require("../services/event");
const okStatus = 200;
const serverErrorStatus = 500;

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getEventTypes = async (req, res) => {
	const eventTypes = await getAllEventTypes();
	try {
		res.status(okStatus).json({
			eventTypes,
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const getAllEvents = async (req, res) => {
	const events = await getAllEventsService();
	try {
		res.status(okStatus).json({
			events,
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const getEventByID = async (req, res) => {
	try {
		const event = await getEventByIDService(req.params.id);
		res.status(okStatus).json({
			event,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const postEvent = async (req, res) => {
	try {
		const newEvent = await postEventService(req);
		res.status(okStatus).json({
			newEvent,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const updateEvent = async (req, res) => {
	try {
		const updatedEvent = await updateEventService(req);
		res.status(okStatus).json({
			updatedEvent,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const deleteEvent = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(okStatus).json({
			message: `Successfully deleted event with id: ${id}`,
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	getEventTypes,
	getAllEvents,
	getEventByID,
	postEvent,
	updateEvent,
	deleteEvent,
};
