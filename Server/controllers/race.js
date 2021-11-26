function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAllRaces = async (req, res) => {
	try {
		res.status(200).json({
			data: [
				{
					id: 1,
					eventId: 1,
					startTime: "26-11-2021 15:00:00",
					classId: 3,
				},
				{
					id: 2,
					eventId: 1,
					startTime: "12-12-2021 16:00:00",
					classId: 3,
				},
				{
					id: 3,
					eventId: 3,
					startTime: "06-12-2021 16:45:00",
					classId: 3,
				},
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const getRaceByID = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			data: [
				{
					id: id,
					eventId: 1,
					startTime: "26-11-2021 15:00:00",
					classId: 3,
				},
			],
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

const getAllRaceBoats = async (req, res) => {
	try {
		const id = randomInteger(0, 30);
		res.status(200).json({
			boats: [
				{
					boatId: id,
					startTime: "23-11-2021 15:00:00",
					finishTime: "24-11-2021 17:42:43",
					position: 1,
				},
				{
					boatId: id,
					startTime: "23-11-2021 15:00:00",
					finishTime: "24-11-2021 18:45:32",
					position: 2,
				},
				{
					boatId: id,
					startTime: "23-11-2021 15:00:00",
					finishTime: "24-11-2021 19:15:32",
					position: 3,
				},
				{
					boatId: id,
					startTime: "23-11-2021 15:00:00",
					finishTime: "25-11-2021 02:15:23",
					position: 4,
				},
				{
					boatId: id,
					startTime: "23-11-2021 15:00:00",
					finishTime: "25-11-2021 04:04:56",
					position: 5,
				},
				{
					boatId: id,
					startTime: "23-11-2021 15:00:00",
					finishTime: "25-11-2021 09:13:13",
					position: 6,
				},
			],
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
	getAllRaceBoats,
	postRaceBoats,
	getAllRaces,
	getRaceByID,
	postRace,
	updateRace,
	deleteRace,
};
