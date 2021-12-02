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

const postMemberService = (req) => {
	return prisma.members.create({
		data: {
			name: req.body.name,
			roleid: req.body.roleId,
		},
	});
};

const postMemberRoleService = (req) => {
	return prisma.roles.create({
		data: {
			role: req.body.role,
		},
	});
};

const updatedMemberService = (req) => {
	const updatedMember = prisma.members.update({
		where: {
			id: parseInt(req.params.id),
		},
		data: {
			name: req.body.name,
			roleid: parseInt(req.body.roleId),
		},
	});
	return updatedMember;
};

exports.updatedMemberService = updatedMemberService;
exports.postMemberRoleService = postMemberRoleService;
exports.postMemberService = postMemberService;
exports.getMembersbyIDService = getMembersbyIDService;
exports.getAllMemberRolesService = getAllMemberRolesService;
exports.getAllMembersService = getAllMembersService;
