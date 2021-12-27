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
					id: true,
					position: true,
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

const getRaceBoatsById = async (id) => {
	return await prisma.raceboats.findMany({
		where: {
			raceid: parseInt(id),
		},
	});
};

const postRaceService = async (req) => {
	const { eventId, classId, startTime } = req.body;
	return await prisma.races.create({
		data: {
			eventid: eventId,
			classid: classId,
			starttime: startTime,
		},
	});
};

const updateRaceService = async (req) => {
	const { eventId, classId, startTime } = req.body;
	const { id } = req.params;

	const updatedRace = await prisma.races.update({
		where: {
			id: parseInt(id),
		},
		data: {
			eventid: parseInt(eventId),
			classid: parseInt(classId),
			starttime: moment.utc(startTime).toISOString(),
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
		const { boatId, finishTime, startTime, position } = req.body;
		const { id } = req.params;
		await prisma.raceboats.create({
			data: {
				raceid: parseInt(id),
				boatid: parseInt(boatId),
				starttime: startTime,
				finishtime: finishTime,
				position: position,
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
exports.getRaceBoatsById = getRaceBoatsById;
