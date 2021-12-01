const { PrismaClient } = require("@prisma/client");
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

	console.log(modifyEvents(events));
};

const modifyEvents = (events) => {
	return events.map((e) => {
		e.races.map((r) => {
			r.raceboats.map((rb) => {
				return {
					...rb,
					elapsedTime: rb.finishtime.getTime() - rb.starttime.getTime() / 1000,
				};
			});
		});
	});
};

exports.getAllEventTypes = getAllEventTypes;
exports.getAllEventsService = getAllEventsService;
exports.getEventByIDService = getEventByIDService;
