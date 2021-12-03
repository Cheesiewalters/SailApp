const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const prisma = new PrismaClient();

const getAllRacesService = async () => {
	return await prisma.races.findMany();
};

const getRaceByIdService = async (id) => {
	return await prisma.races.findMany({
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

const postRaceService = async (req) => {
	return await prisma.races.create({
		data: {
			eventid: req.body.eventId,
			classid: req.body.classId,
			starttime: req.body.startTime,
		},
	});
};

const updateRaceService = async (req) => {
	const updatedRace = await prisma.races.update({
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

const deleteRaceService = async (req) => {
	try {
		await prisma.raceboats.deleteMany({
			where: {
				raceid: parseInt(req.params.id),
			},
		});

		await prisma.races.delete({
			where: {
				id: parseInt(req.params.id),
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const postRaceBoatsService = async (req) => {
	try {
		await prisma.raceboats.create({
			data: {
				raceid: parseInt(req.params.id),
				boatid: parseInt(req.body.boatId),
				starttime: req.body.startTime,
				finishtime: req.body.finishTime,
				position: req.body.position,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

exports.postRaceBoatsService = postRaceBoatsService;
exports.deleteRaceService = deleteRaceService;
exports.updateRaceService = updateRaceService;
exports.postRaceService = postRaceService;
exports.getAllRacesService = getAllRacesService;
exports.getRaceByIdService = getRaceByIdService;
