const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const prisma = new PrismaClient();

const getAllEventTypes = () => {
	return prisma.eventtypes.findMany();
};

const getAllEventsService = () => {
	return prisma.events.findMany();
};

const getEventByIDService = async (id) => {
	const events = await prisma.events.findMany({
		where: {
			id: parseInt(id),
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

const modifyEvents = (events) => {
	return events.map((e) => {
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

const postEventService = (req) => {
	const newEvent = prisma.events.create({
		data: {
			eventtypeid: req.body.eventTypeId,
			starttime: req.body.startTime,
			enddate: req.body.endDate,
			name: req.body.name,
			creatorid: req.body.creatorId,
			description: req.body.description,
		},
	});
	return newEvent;
};

const updateEventService = (req) => {
	const updatedEventTypeID = parseInt(req.body.eventTypeId);
	const updatedCreatorId = parseInt(req.body.creatorId);
	const updatedId = parseInt(req.params.id);

	const updatedEvent = prisma.events.update({
		where: {
			id: updatedId,
		},
		data: {
			eventtypeid: updatedEventTypeID,
			starttime: moment.utc(req.body.startTime).toISOString(),
			enddate: moment.utc(req.body.endDate).toISOString(),
			name: req.body.name,
			creatorid: updatedCreatorId,
			description: req.body.description,
		},
	});
	return updatedEvent;
};

exports.updateEventService = updateEventService;
exports.postEventService = postEventService;
exports.getAllEventTypes = getAllEventTypes;
exports.getAllEventsService = getAllEventsService;
exports.getEventByIDService = getEventByIDService;
