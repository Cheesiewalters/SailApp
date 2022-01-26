const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("../middleware/jwt");
const randtoken = require("rand-token");
let refreshTokens = {};

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
	const accessToken = await jwt.signAccessToken(user);
	const refreshToken = randtoken.uid(256);
	refreshTokens[refreshToken] = user.email;
	console.log(refreshTokens);
	return { ...user, accessToken, refreshToken };
};

const refreshTokenService = async (data) => {
	const { email, refreshToken } = data;
	if (refreshToken in refreshTokens && refreshTokens[refreshToken] == email) {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		const token = await jwt.signAccessToken(user);
		return {
			accessToken: token,
		};
	} else {
		return {
			error: "The users refresh token is not valid and has been logged out",
		};
	}
};

const allService = async () => {
	const allUsers = await prisma.user.findMany();
	return allUsers;
};

exports.registerService = registerService;
exports.loginService = loginService;
exports.refreshTokenService = refreshTokenService;
exports.allService = allService;
