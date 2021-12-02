const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getAllRacesService,
	getRaceByIdService,
	postRaceService,
} = require("../services/race");
const okStatus = 200;
const errorStatus = 500;

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAllRaces = async (req, res) => {
	try {
		const race = await getAllRacesService();
		res.status(okStatus).json({
			race,
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const getRaceByID = async (req, res) => {
	try {
		const race = await getRaceByIdService(req.params.id);
		res.status(okStatus).json({
			race,
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const postRace = async (req, res) => {
	try {
		const newRace = postRaceService(req);
		res.status(okStatus).json({
			newRace,
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const updateRace = async (req, res) => {
	try {
		const eventId = req.body.eventId;
		const startTime = req.body.startTime;
		const classId = req.body.classId;
		const id = req.params.id;
		res.status(okStatus).json({
			updatedRace: {
				id: id,
				eventId: eventId,
				classId: classId,
				startTime: startTime,
			},
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const deleteRace = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(okStatus).json({
			message: `Successfully deleted race with id: ${id}`,
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const postRaceBoats = async (req, res) => {
	try {
		const boatId = req.body.boatId;
		const startTime = req.body.startTime;
		const finishTime = req.body.finishTime;
		const position = req.body.position;
		const id = randomInteger(0, 10);
		res.status(okStatus).json({
			newRace: {
				id: id,
				boatId: boatId,
				startTime: startTime,
				finishTime: finishTime,
				position: position,
			},
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

module.exports = {
	postRaceBoats,
	getAllRaces,
	getRaceByID,
	postRace,
	updateRace,
	deleteRace,
};
