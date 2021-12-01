const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllMemberRolesService = () => {
	return prisma.members.findMany({
		include: {
			roles: {
				select: {
					role: true,
				},
			},
		},
	});
};

const getAllMembersService = () => {
	return prisma.members.findMany();
};

const getMembersbyIDService = (id) => {
	return prisma.members.findMany({
		where: {
			id: parseInt(id),
		},
		include: {
			roles: {
				select: {
					role: true,
				},
			},
		},
	});
};

exports.getMembersbyIDService = getMembersbyIDService;
exports.getAllMemberRolesService = getAllMemberRolesService;
exports.getAllMembersService = getAllMembersService;
