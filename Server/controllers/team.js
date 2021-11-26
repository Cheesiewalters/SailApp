function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAllTeams = async (req, res) => {
	try {
		res.status(200).json({
			data: [
				{
					name: "QUB sailing",
				},
				{
					name: "TUD sailing",
				},
				{
					name: "NUIG Sailing",
				},
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const getTeamByID = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			data: [
				{
					id: id,
					name: "QUB Sailing",
					members: [
						{ memberId: 23, name: "Conor Walters" },
						{ memberId: 45, name: "Niall Walters" },
						{ memberId: 55, name: "Tom Purdon" },
						{ memberId: 233, name: "Patrick Walsh" },
						{ memberId: 76, name: "mark Brown" },
						{ memberId: 5746, name: "Tom Finnagan" },
					],
				},
			],
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const postTeam = async (req, res) => {
	try {
		const name = req.body.name;
		const id = randomInteger(0, 10);
		res.status(200).json({
			newBoat: {
				id: id,
				name: name,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const updateTeam = async (req, res) => {
	try {
		const name = req.body.name;
		const id = req.params.id;
		res.status(200).json({
			updatedTeam: {
				id: id,
				name: name,
			},
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const deleteTeam = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(200).json({
			message: `Successfully deleted team with id: ${id}`,
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

module.exports = {
	getAllTeams,
	postTeam,
	deleteTeam,
	updateTeam,
	getTeamByID,
};
