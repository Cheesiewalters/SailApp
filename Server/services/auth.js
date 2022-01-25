const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("../middleware/jwt");

const registerService = async (data) => {
	const { email } = data;
	data.password = bcrypt.hashSync(data.password, 8);
	const user = await prisma.user.create({
		data: {
			email: data.email,
			password: data.password,
			roleid: data.roleid,
		},
	});
	data.accessToken = await jwt.signAccessToken(user);
	return data;
};

const loginService = async (data) => {
	const { email, password } = data;
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (!user) {
		return { error: "user not found" };
	}
	const checkPassword = bcrypt.compareSync(password, user.password);
	if (!checkPassword) return { error: "Password is incorrect for account" };
	delete user.password;
	const accessToken = await jwt.sign(user);
	return { ...user, accessToken };
};

const allService = async () => {
	const allUsers = await prisma.user.findMany();
	return allUsers;
};

exports.registerService = registerService;
exports.loginService = loginService;
exports.allService = allService;
