const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
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

const updateRaceService = (req) => {
	const updatedRace = prisma.races.update({
		where: {
			id: parseInt(req.params.id),
		},
		data: {
			eventid: parseInt(req.body.eventId),
			classid: parseInt(req.body.classId),
			starttime: moment.utc(req.body.startTime).toISOString(),
		},
	});
	return updatedRace;
};

exports.updateRaceService = updateRaceService;
exports.postRaceService = postRaceService;
exports.getAllRacesService = getAllRacesService;
exports.getRaceByIdService = getRaceByIdService;
