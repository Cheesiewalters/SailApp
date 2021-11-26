function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getEventTypes = async (req, res) => {
	try {
		const id = randomInteger(0, 10);
		res.status(200).json({
			eventType: {
				id: id,
				name: "Fleet racing",
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const getAllEvents = async (req, res) => {
	try {
		res.status(200).json({
			data: [
				{
					id: 1,
					eventTypeId: 1,
					startTime: "24-11-2021 15:00:00",
					endDate: "24-11-2021 18:00:00",
					name: "EDYC Youth topper race",
					creatorId: 12,
					description: "Weekly racing event held every wednesday night",
				},
				{
					id: 2,
					eventTypeId: 1,
					startTime: "27-11-2021 15:15:00",
					endDate: "24-11-2021 17:45:00",
					name: "EDYC Cruiser wednesday night race",
					creatorId: 12,
					description: "Weekly racing event held every wednesday night",
				},
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const getEventByID = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			data: [
				{
					id: id,
					eventTypeId: 1,
					eventTypeDescription: "Fleet racing",
					startTime: "24-11-2021 15:00:00",
					endDate: "24-11-2021 18:00:00",
					name: "EDYC Youth topper race",
					creatorId: 12,
					description: "Weekly racing event held every wednesday night",
				},
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const postEvent = async (req, res) => {
	try {
		const eventTypeId = req.body.eventTypeId;
		const startTime = req.body.startTime;
		const endDate = req.body.endDate;
		const name = req.body.name;
		const creatorId = req.body.creatorId;
		const description = req.body.description;
		const id = randomInteger(0, 10);
		res.status(200).json({
			newEvent: {
				id: id,
				eventTypeId: eventTypeId,
				startTime: startTime,
				endDate: endDate,
				name: name,
				creatorId: creatorId,
				description: description,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const updateEvent = async (req, res) => {
	try {
		const id = req.params.id;
		const eventTypeId = req.body.eventTypeId;
		const startTime = req.body.startTime;
		const endDate = req.body.endDate;
		const name = req.body.name;
		const creatorId = req.body.creatorId;
		const description = req.body.description;
		res.status(200).json({
			updatedEvent: {
				id: id,
				eventTypeId: eventTypeId,
				startTime: startTime,
				endDate: endDate,
				name: name,
				creatorId: creatorId,
				description: description,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const deleteEvent = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			message: `Successfully deleted event with id: ${id}`,
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

module.exports = {
	getEventTypes,
	getAllEvents,
	getEventByID,
	postEvent,
	updateEvent,
	deleteEvent,
};
