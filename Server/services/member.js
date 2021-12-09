const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllMembersService = async () => {
	return await prisma.members.findMany();
};

const getMembersbyIDService = async (id) => {
	return await prisma.members.findMany({
		where: {
			id: parseInt(id),
		},
	});
};

const postMemberService = async (req) => {
	const { firstName, lastName, email, password } = req.body;
	return await prisma.members.create({
		data: {
			firstname: firstName,
			lastname: lastName,
			email: email,
			password: password,
		},
	});
};

const updatedMemberService = async (req) => {
	const { firstName, lastName, email, password } = req.body;
	const { id } = req.params;
	const updatedMember = await prisma.members.update({
		where: {
			id: parseInt(id),
		},
		data: {
			firstname: firstName,
			lastname: lastName,
			email: email,
			password: password,
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
exports.postMemberService = postMemberService;
exports.getMembersbyIDService = getMembersbyIDService;
exports.getAllMembersService = getAllMembersService;
