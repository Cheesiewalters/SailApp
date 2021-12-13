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
	try {
		const classes = await getAllBoatClassesService();
		res.status(okStatus).json({
			classes,
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const getAllBoats = async (req, res) => {
	try {
		const boats = await getAllBoatsService();
		res.status(okStatus).json({
			boats,
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const getBoatByID = async (req, res) => {
	try {
		const boat = await getBoatsByIdService(req.params.id);
		res.status(okStatus).json({ boat });
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const postBoat = async (req, res) => {
	try {
		const newBoat = await postBoatService(req);
		res.status(okStatus).json({
			newBoat,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const updateBoat = async (req, res) => {
	try {
		const updatedBoat = await updateBoatService(req);
		res.status(okStatus).json({
			updatedBoat,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const deleteBoat = async (req, res) => {
	try {
		await deleteBoatService(req.params.id);
		res.status(okStatus).json({
			message: `Successfully deleted boat with id: ${req.params.id}`,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	getAllBoats,
	getBoatByID,
	postBoat,
	updateBoat,
	deleteBoat,
	getAllClasses,
};
