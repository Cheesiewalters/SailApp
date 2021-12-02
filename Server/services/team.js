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

exports.postTeamService = postTeamService;
exports.getAllTeamsService = getAllTeamsService;
exports.getTeamByIdService = getTeamByIdService;
