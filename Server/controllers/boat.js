const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getAllBoatsService,
	getBoatsByIdService,
	postBoatService,
	updateBoatService,
	deleteBoatService,
	getAllBoatClassesService,
} = require("../services/boat");
const okStatus = 200;
const serverErrorStatus = 500;

const getAllClasses = async (req, res) => {
	const classes = await getAllBoatClassesService();
	if (!classes || classes.length === 0) return res.sendStatus(204);
	res.status(okStatus).json({
		classes,
	});
};

const getAllBoats = async (req, res) => {
	const boats = await getAllBoatsService();
	if (boats && boats.length > 0) {
		return res.status(okStatus).json({
			boats,
		});
	}

	res.sendStatus(204);
};

const getBoatByID = async (req, res) => {
	const boat = await getBoatsByIdService(req.params.id);
	if (!boat || boat.length === 0) return res.sendStatus(204);
	res.status(okStatus).json({ boat });
};

const postBoat = async (req, res) => {
	const newBoat = await postBoatService(req);
	if (!newBoat || newBoat.length === 0)
		return res.sendStatus(serverErrorStatus);
	res.status(okStatus).json({
		newBoat,
	});
};

const updateBoat = async (req, res) => {
	const updatedBoat = await updateBoatService(req);
	if (!updatedBoat || updatedBoat.length === 0) return res.sendStatus(400);
	res.status(okStatus).json({
		updatedBoat,
	});
};

const deleteBoat = async (req, res) => {
	const deletedBoat = await deleteBoatService(req.params.id);
	if (!deletedBoat || deletedBoat.length === 0) return res.sendStatus(500);

	res.status(okStatus).json({
		message: `Successfully deleted boat with id: ${req.params.id}`,
	});
};

module.exports = {
	getAllBoats,
	getBoatByID,
	postBoat,
	updateBoat,
	deleteBoat,
	getAllClasses,
};
