const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
	getAllTeamsService,
	getTeamByIdService,
	postTeamService,
} = require("../services/team");
const okStatus = 200;
const errorStatus = 500;

const getAllTeams = async (req, res) => {
	try {
		const teams = await getAllTeamsService();
		res.status(okStatus).json({
			teams,
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "database error" });
	}
};

const getTeamByID = async (req, res) => {
	try {
		const team = await getTeamByIdService(req.params.id);
		res.status(okStatus).json({
			team,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const postTeam = async (req, res) => {
	try {
		const newTeam = await postTeamService(req);
		res.status(okStatus).json({
			newTeam,
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "database error" });
	}
};

const updateTeam = async (req, res) => {
	try {
		const name = req.body.name;
		const id = req.params.id;
		res.status(okStatus).json({
			updatedTeam: {
				id: id,
				name: name,
			},
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "database error" });
	}
};

const deleteTeam = async (req, res) => {
	try {
		const id = req.params.id;
		res.status(okStatus).json({
			message: `Successfully deleted team with id: ${id}`,
		});
	} catch (error) {
		res.status(errorStatus).json({ error: "database error" });
	}
};

module.exports = {
	getAllTeams,
	postTeam,
	deleteTeam,
	updateTeam,
	getTeamByID,
};
