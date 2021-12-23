const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const prisma = new PrismaClient();

const getAllEventTypes = async () => {
	return await prisma.eventtypes.findMany();
};

const getAllEventsService = async () => {
	return await prisma.events.findMany();
};

const getEventByIDService = async (id) => {
	const events = await prisma.events.findMany({
		where: {
			id: parseInt(id),
		},
		include: {
			clubs: {
				select: {
					name: true,
				},
			},
			eventtypes: {
				select: {
					name: true,
				},
			},
			races: {
				select: {
					id: true,
					starttime: true,
					class: true,
					raceboats: {
						select: {
							starttime: true,
							finishtime: true,
							position: true,
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

	return modifyEvents(events);
};

const modifyEvents = async (events) => {
	return await events.map((e) => {
		return {
			...e,
			races: e.races.map((r) => {
				return {
					...r,
					raceboats: r.raceboats.map((rb) => {
						return {
							...rb,
							duration:
								(rb.finishtime.getTime() - rb.starttime.getTime()) / 1000,
						};
					}),
				};
			}),
		};
	});
};

const postEventService = async (req) => {
	const { eventTypeId, startTime, endDate, name, clubId, description } =
		req.body;

	const newEvent = await prisma.events.create({
		data: {
			eventtypeid: eventTypeId,
			starttime: startTime,
			enddate: endDate,
			name: name,
			clubid: clubId,
			description: description,
		},
	});
	return newEvent;
};

const updateEventService = async (req) => {
	const { eventTypeId, startTime, endDate, name, clubId, description } =
		req.body;

	const updatedEventTypeID = parseInt(eventTypeId);
	const updatedclubId = parseInt(clubId);
	const updatedId = parseInt(req.params.id);

	const updatedEvent = await prisma.events.update({
		where: {
			id: updatedId,
		},
		data: {
			eventtypeid: updatedEventTypeID,
			starttime: moment.utc(startTime).toISOString(),
			enddate: moment.utc(endDate).toISOString(),
			name: name,
			clubid: updatedclubId,
			description: description,
		},
	});
	return updatedEvent;
};

const deleteEventService = async (id) => {
	await prisma.races.deleteMany({
		where: {
			eventid: parseInt(id),
		},
	});

	await prisma.events.delete({
		where: {
			id: parseInt(id),
		},
	});
};

exports.deleteEventService = deleteEventService;
exports.updateEventService = updateEventService;
exports.postEventService = postEventService;
exports.getAllEventTypes = getAllEventTypes;
exports.getAllEventsService = getAllEventsService;
exports.getEventByIDService = getEventByIDService;
