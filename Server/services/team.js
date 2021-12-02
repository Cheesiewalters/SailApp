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
	const newTeam = prisma.teams.create({
		data: {
			name: req.body.name,
		},
	});
	return newTeam;
};

const updateTeamService = (req) => {
	const updatedTeam = prisma.teams.update({
		where: {
			id: parseInt(req.params.id),
		},
		data: {
			name: req.body.name,
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
