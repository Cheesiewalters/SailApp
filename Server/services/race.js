const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllRacesService = () => {
	return prisma.races.findMany();
};

const getRaceByIdService = (id) => {
	return prisma.races.findMany({
		where: {
			id: parseInt(id),
		},
		include: {
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
	});
};

const postRaceService = (req) => {
	return prisma.races.create({
		data: {
			eventid: req.body.eventId,
			classid: req.body.classId,
			starttime: req.body.startTime,
		},
	});
};

exports.postRaceService = postRaceService;
exports.getAllRacesService = getAllRacesService;
exports.getRaceByIdService = getRaceByIdService;
