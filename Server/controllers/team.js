const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
	getAllTeamsService,
	getTeamByIdService,
	postTeamService,
	updateTeamService,
	deleteTeamService,
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
		const updatedTeam = await updateTeamService(req);
		res.status(okStatus).json({
			updatedTeam,
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "database error" });
	}
};

const deleteTeam = async (req, res) => {
	try {
		const deleteTeam = await deleteTeamService(req.params.id);
		res.status(okStatus).json({
			message: `Successfully deleted team with id: ${req.params.id}`,
			deletedTeam: deleteTeam,
		});
	} catch (error) {
		console.log(error);
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
