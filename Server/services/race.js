const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const { patch } = require("../routers/race");
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

const deleteRaceBoatsByIDService = async (req) => {
	try {
		const { id2 } = req.params;
		console.log(req.params.id2);

		await prisma.raceboats.deleteMany({
			where: {
				boatid: parseInt(id2),
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const updateRaceBoatService = async (req) => {
	try {
		const { boatId, finishTime, startTime, position } = req.body;
		const { id } = req.params;

		const updatedRace = await prisma.raceboats.updateMany({
			where: {
				raceid: parseInt(id),
				boatid: parseInt(boatId),
			},
			data: {
				position: parseInt(position),
				starttime: moment.utc(startTime).toISOString(),
				finishtime: moment.utc(finishTime).toISOString(),
			},
		});
		return updatedRace;
	} catch (error) {
		console.log(error);
	}
};

const getRaceBoatByBoatIdService = async (req) => {
	try {
		return await prisma.raceboats.findMany({
			where: {
				raceid: parseInt(req.params.id),
				boatid: parseInt(req.params.id2),
			},
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteRaceBoatsByIDService = deleteRaceBoatsByIDService;
exports.postRaceBoatsService = postRaceBoatsService;
exports.deleteRaceService = deleteRaceService;
exports.updateRaceService = updateRaceService;
exports.postRaceService = postRaceService;
exports.getAllRacesService = getAllRacesService;
exports.getRaceByIdService = getRaceByIdService;
exports.getRaceBoatsById = getRaceBoatsById;
exports.updateRaceBoatService = updateRaceBoatService;
exports.getRaceBoatByBoatIdService = getRaceBoatByBoatIdService;
