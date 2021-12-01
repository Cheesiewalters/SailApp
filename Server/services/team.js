const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTeamsService = () => {
	return prisma.teams.findMany();
};

const getTeamByIdService = (id) => {
	prisma.teams.findMany({
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

exports.getAllTeamsService = getAllTeamsService;
exports.getTeamByIdService = getTeamByIdService;
