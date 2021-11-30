const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAllTeams = async (req, res) => {
	try {
		const teams = await prisma.teams.findMany();
		res.status(200).json({
			teams,
		});
	} catch (error) {
		res.status(400).json({ error: "database error" });
	}
};

const getTeamByID = async (req, res) => {
	try {
		const team = await prisma.teams.findMany({
			where: {
				id: parseInt(req.params.id),
			},
			include: {
				teammembers: {
					select: {
						members: true,
					},
				},
			},
		});
		res.status(200).json({
			team,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
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
