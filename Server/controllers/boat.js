const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getAllBoatsService, getBoatsByIdService } = require("../services/boat");
const okStatus = 200;
const serverErrorStatus = 500;

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
		const typeId = req.body.typeId;
		const classId = req.body.classId;
		const ownerId = req.body.ownerId;
		const name = req.body.name;
		const teamId = req.body.teamId;
		const id = randomInteger(0, 10);
		res.status(okStatus).json({
			newBoat: {
				id: id,
				typeId: typeId,
				classId: classId,
				ownerId: ownerId,
				name: name,
				teamId: teamId,
			},
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const updateBoat = async (req, res) => {
	try {
		const typeId = req.body.typeId;
		const classId = req.body.classId;
		const ownerId = req.body.ownerId;
		const name = req.body.name;
		const teamId = req.body.teamId;
		const id = req.params.id;
		res.status(okStatus).json({
			updatedBoat: {
				id: id,
				typeId: typeId,
				classId: classId,
				ownerId: ownerId,
				name: name,
				teamId: teamId,
			},
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const deleteBoat = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(okStatus).json({
			message: `Successfully deleted boat with id: ${id}`,
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	getAllBoats,
	getBoatByID,
	postBoat,
	updateBoat,
	deleteBoat,
};
