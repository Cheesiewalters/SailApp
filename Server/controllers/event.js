const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const okStatus = 200;
const serverErrorStatus = 500;

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getEventTypes = async (req, res) => {
	const eventTypes = await prisma.eventtypes.findMany();
	try {
		res.status(okStatus).json({
			eventTypes,
		});
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getAllEvents = async (req, res) => {
	const events = await prisma.events.findMany();
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
		const event = await prisma.events.findMany({
			where: {
				id: parseInt(req.params.id),
			},
			include: {
				races: {
					select: {
						starttime: true,
						class: true,
						raceboats: {
							select: {
								starttime: true,
								finishtime: true,
								boats: {
									select: {
										id: true,
										name: true,
										classid: true,
									},
								},
							},
						},
					},
				},
			},
		});
		res.status(okStatus).json({
			event,
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const postEvent = async (req, res) => {
	try {
		const eventTypeId = req.body.eventTypeId;
		const startTime = req.body.startTime;
		const endDate = req.body.endDate;
		const name = req.body.name;
		const creatorId = req.body.creatorId;
		const description = req.body.description;
		const id = randomInteger(0, 10);
		res.status(okStatus).json({
			newEvent: {
				id: id,
				eventTypeId: eventTypeId,
				startTime: startTime,
				endDate: endDate,
				name: name,
				creatorId: creatorId,
				description: description,
			},
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const updateEvent = async (req, res) => {
	try {
		const id = req.params.id;
		const eventTypeId = req.body.eventTypeId;
		const startTime = req.body.startTime;
		const endDate = req.body.endDate;
		const name = req.body.name;
		const creatorId = req.body.creatorId;
		const description = req.body.description;
		res.status(okStatus).json({
			updatedEvent: {
				id: id,
				eventTypeId: eventTypeId,
				startTime: startTime,
				endDate: endDate,
				name: name,
				creatorId: creatorId,
				description: description,
			},
		});
	} catch (error) {
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
