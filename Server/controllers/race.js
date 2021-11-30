const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAllRaces = async (req, res) => {
	try {
		const race = await prisma.races.findMany();
		res.status(200).json({
			race,
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const getRaceByID = async (req, res) => {
	try {
		const race = await prisma.races.findMany({
			where: {
				id: parseInt(req.params.id),
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
		console.log(race);
		res.status(200).json({
			race,
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const postRace = async (req, res) => {
	try {
		const eventId = req.body.eventId;
		const startTime = req.body.startTime;
		const classId = req.body.classId;
		const id = randomInteger(0, 10);
		res.status(200).json({
			newRace: {
				id: id,
				eventId: eventId,
				classId: classId,
				startTime: startTime,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const updateRace = async (req, res) => {
	try {
		const eventId = req.body.eventId;
		const startTime = req.body.startTime;
		const classId = req.body.classId;
		const id = req.params.id;
		res.status(200).json({
			updatedRace: {
				id: id,
				eventId: eventId,
				classId: classId,
				startTime: startTime,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const deleteRace = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			message: `Successfully deleted race with id: ${id}`,
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const postRaceBoats = async (req, res) => {
	try {
		const boatId = req.body.boatId;
		const startTime = req.body.startTime;
		const finishTime = req.body.finishTime;
		const position = req.body.position;
		const id = randomInteger(0, 10);
		res.status(200).json({
			newRace: {
				id: id,
				boatId: boatId,
				startTime: startTime,
				finishTime: finishTime,
				position: position,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
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
