const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllMemberRolesService = async () => {
	return await prisma.roles.findMany();
};

const getAllMembersService = async () => {
	return await prisma.members.findMany({
		include: {
			roles: {
				select: {
					role: true,
				},
			},
		},
	});
};

const getMembersbyIDService = async (id) => {
	return await prisma.members.findMany({
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

const postMemberService = async (req) => {
	return await prisma.members.create({
		data: {
			name: req.body.name,
			roleid: req.body.roleId,
		},
	});
};

const postMemberRoleService = async (req) => {
	return await prisma.roles.create({
		data: {
			role: req.body.role,
		},
	});
};

const updatedMemberService = async (req) => {
	const updatedMember = await prisma.members.update({
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

const deleteMembersService = async (id) => {
	await prisma.teammembers.deleteMany({
		where: {
			memberid: parseInt(id),
		},
	});

	await prisma.members.delete({
		where: {
			id: parseInt(id),
		},
	});
};

exports.deleteMembersService = deleteMembersService;
exports.updatedMemberService = updatedMemberService;
exports.postMemberRoleService = postMemberRoleService;
exports.postMemberService = postMemberService;
exports.getMembersbyIDService = getMembersbyIDService;
exports.getAllMemberRolesService = getAllMemberRolesService;
exports.getAllMembersService = getAllMembersService;
