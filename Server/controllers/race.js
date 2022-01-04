const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getAllRacesService,
	getRaceByIdService,
	postRaceService,
	updateRaceService,
	deleteRaceService,
	postRaceBoatsService,
	getRaceBoatsById,
	deleteRaceBoatsByIDService,
	updateRaceBoatService,
	getRaceBoatByBoatIdService,
} = require("../services/race");
const okStatus = 200;
const errorStatus = 500;

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
		res.status(okStatus).json({ race });
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const postRace = async (req, res) => {
	try {
		const newRace = await postRaceService(req);
		res.status(okStatus).json({
			newRace,
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const updateRace = async (req, res) => {
	try {
		const updatedRace = await updateRaceService(req);
		res.status(okStatus).json({
			updatedRace,
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const postRaceBoats = async (req, res) => {
	try {
		await postRaceBoatsService(req);
		res.status(okStatus).json({
			message: `Successfully posted boat:${req.body.boatId} for race:${req.params.id} `,
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const getAllRaceBoatsByID = async (req, res) => {
	try {
		const boats = await getRaceBoatsById(req.params.id);
		res.status(okStatus).json(boats);
	} catch (error) {
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const deleteRace = async (req, res) => {
	try {
		await deleteRaceService(req);
		res.status(okStatus).json({
			message: `Successfully deleted race with id: ${req.params.id}`,
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const deleteAllRaceBoatsById = async (req, res) => {
	try {
		await deleteRaceBoatsByIDService(req);
		res.status(okStatus).json({
			message: `Successfully deleted race boat with id: ${req.params.id}`,
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const updateRaceBoatByBoatId = async (req, res) => {
	try {
		const updatedRace = await updateRaceBoatService(req);
		res.status(okStatus).json({
			message: "Succesfully updated raceBoat",
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

const getRaceBoatByBoatId = async (req, res) => {
	try {
		const boat = await getRaceBoatByBoatIdService(req);
		res.status(okStatus).json(boat);
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "Internal Server error" });
	}
};

module.exports = {
	deleteAllRaceBoatsById,
	postRaceBoats,
	getAllRaces,
	getRaceByID,
	postRace,
	updateRace,
	getAllRaceBoatsByID,
	deleteRace,
	updateRaceBoatByBoatId,
	getRaceBoatByBoatId,
};
