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
	const race = await getAllRacesService();
	if (!race || race.length === 0) return res.sendStatus(204);
	res.status(okStatus).json({
		race,
	});
};

const getRaceByID = async (req, res) => {
	const race = await getRaceByIdService(req.params.id);
	if (!race || race.length === 0) return res.sendStatus(204);
	res.status(okStatus).json({ race });
};

const postRace = async (req, res) => {
	const newRace = await postRaceService(req);
	if (!newRace || newRace.length === 0) return res.sendStatus(400);
	res.status(okStatus).json({
		newRace,
	});
};

const updateRace = async (req, res) => {
	const updatedRace = await updateRaceService(req);
	if (!updatedRace || updatedRace.length === 0) return res.sendStatus(400);
	res.status(okStatus).json({
		updatedRace,
	});
};

const postRaceBoats = async (req, res) => {
	const newRaceBoat = await postRaceBoatsService(req);
	if (!newRaceBoat || newRaceBoat.length === 0) return res.sendStatus(204);
	res.status(okStatus).json({
		message: `Successfully posted boat:${req.body.boatId} for race:${req.params.id} `,
	});
};

const getAllRaceBoatsByID = async (req, res) => {
	const boats = await getRaceBoatsById(req.params.id);
	if (!boats || boats.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(boats);
};

const deleteRace = async (req, res) => {
	const deletedRace = await deleteRaceService(req);
	if (!deletedRace || deletedRace.length === 0) return res.sendStatus(204);
	res.status(okStatus).json({
		message: `Successfully deleted race with id: ${req.params.id}`,
	});
};

const deleteAllRaceBoatsById = async (req, res) => {
	const deletedRaceBoatsByID = await deleteRaceBoatsByIDService(req);
	if (!deletedRaceBoatsByID || deletedRaceBoatsByID.length === 0)
		return res.sendStatus(400);

	res.status(okStatus).json({
		message: `Successfully deleted race boat with id: ${req.params.id}`,
	});
};

const updateRaceBoatByBoatId = async (req, res) => {
	const updatedRace = await updateRaceBoatService(req);
	if (!updatedRace || updatedRace.length === 0) return res.sendStatus(400);

	res.status(okStatus).json({
		message: "Succesfully updated raceBoat",
	});
};

const getRaceBoatByBoatId = async (req, res) => {
	const boat = await getRaceBoatByBoatIdService(req);
	if (!boat || boat.length === 0) return res.sendStatus(500);
	res.status(okStatus).json(boat);
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
