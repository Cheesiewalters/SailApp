function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAllBoats = async (req, res) => {
	try {
		res.status(200).json({
			data: [
				{
					id: 1,
					typeId: 1,
					classId: 2,
					ownerId: 3,
					name: "Blue Jay",
					teamId: 12,
				},
				{
					id: 2,
					typeId: 3,
					classId: 5,
					ownerId: 212,
					name: "Moonshine",
					teamId: null,
				},
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const getBoatByID = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			data: [
				{
					id: id,
					typeId: 1,
					classId: 2,
					ownerId: 3,
					name: "QUB Firefly 4",
					teamId: 12,
				},
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
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
		res.status(200).json({
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
		res.status(400).json({ error: "database error" });
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
		res.status(200).json({
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
		res.status(400).json({ error: "database error" });
	}
};

const deleteBoat = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			message: `Successfully deleted boat with id: ${id}`,
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

module.exports = {
	getAllBoats,
	getBoatByID,
	postBoat,
	updateBoat,
	deleteBoat,
};
