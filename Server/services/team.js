const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTeamsService = () => {
	return prisma.teams.findMany();
};

const getTeamByIdService = (id) => {
	return prisma.teams.findMany({
		where: {
			id: parseInt(id),
		},
		include: {
			teammembers: {
				select: {
					members: true,
				},
			},
		},
	});
};

const postTeamService = (req) => {
	const { name } = req.body;
	const newTeam = prisma.teams.create({
		data: {
			name: name,
		},
	});
	return newTeam;
};

const updateTeamService = (req) => {
	const { name } = req.body;
	const { id } = req.params.id;
	const updatedTeam = prisma.teams.update({
		where: {
			id: parseInt(id),
		},
		data: {
			name: name,
		},
	});
	return updatedTeam;
};

const deleteTeamService = (id) => {
	const deleteTeam = prisma.teams.delete({
		where: {
			id: parseInt(id),
		},
	});
	return deleteTeam;
};

exports.deleteTeamService = deleteTeamService;
exports.updateTeamService = updateTeamService;
exports.postTeamService = postTeamService;
exports.getAllTeamsService = getAllTeamsService;
exports.getTeamByIdService = getTeamByIdService;
