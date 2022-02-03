const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("../middleware/jwt");
var refreshTokens = {};

const createUser = async (data) => {
	data.password = bcrypt.hashSync(data.password, 8);
	await prisma.user.create({
		data: {
			email: data.email,
			password: data.password,
			roleid: data.roleid,
		},
	});
};

const login = async ({ email, password }) => {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (!user) {
		throw new Error("User not found");
	}
	const checkPassword = bcrypt.compareSync(password, user.password);
	if (!checkPassword) throw new Error("Password is incorrect");
	delete user.password;
	const accessToken = jwt.signAccessToken(user);
	const refreshToken = jwt.signRefreshToken(user);

	refreshTokens[refreshToken] = user.email;
	return { accessToken, refreshToken };
};

const refreshToken = async ({ refreshToken }) => {
	return await jwt
		.verifyRefreshToken(refreshToken)
		.then(async (data) => {
			const user = await prisma.user.findUnique({
				where: {
					email: data.payload.email,
				},
			});
			const token = jwt.signAccessToken(user);
			return token;
		})
		.catch((e) => {
			return { error: "Error with refresh token" };
		});
};

const getAllUsers = async () => {
	const allUsers = await prisma.user.findMany();
	return allUsers;
};

exports.createUser = createUser;
exports.login = login;
exports.refreshToken = refreshToken;
exports.getAllUsers = getAllUsers;
