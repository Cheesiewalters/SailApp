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
	const { name, roleId } = req.body;
	return await prisma.members.create({
		data: {
			name: name,
			roleid: roleId,
		},
	});
};

const postMemberRoleService = async (req) => {
	const { role } = req.body;
	return await prisma.roles.create({
		data: {
			role: role,
		},
	});
};

const updatedMemberService = async (req) => {
	const { name, roleId } = req.body;
	const { id } = req.params;
	const updatedMember = await prisma.members.update({
		where: {
			id: parseInt(id),
		},
		data: {
			name: name,
			roleid: parseInt(roleId),
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
