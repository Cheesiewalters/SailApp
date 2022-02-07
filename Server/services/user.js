const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const createUser = async (data) => {
	console.log(data.password);
	data.password = bcrypt.hashSync(data.password, 8);
	console.log(data.password);
	await prisma.user.create({
		data: {
			email: data.email,
			password: data.password,
			roleid: data.roleid,
		},
	});
};

const deleteUserByEmail = async ({ email }) => {
	return await prisma.user.delete({
		where: {
			email: email,
		},
	});
};

const getAllUsers = async () => {
	const allUsers = await prisma.user.findMany();
	return allUsers;
};

const getUserByEmail = async (email) => {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	return user;
};

const getUserById = async ({ id }) => {
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});
	return user;
};

exports.getUserById = getUserById;
exports.deleteUserByEmail = deleteUserByEmail;
exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUserByEmail = getUserByEmail;
