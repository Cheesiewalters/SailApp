const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("../middleware/jwt");
var refreshTokens = {};

const registerService = async (data) => {
	data.password = bcrypt.hashSync(data.password, 8);
	const user = await prisma.user.create({
		data: {
			email: data.email,
			password: data.password,
			roleid: data.roleid,
		},
	});
	data.accessToken = await jwt.signAccessToken(user);
	return data.accessToken;
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
	const accessToken = jwt.signAccessToken(user);
	const refreshToken = jwt.signRefreshToken(user);

	refreshTokens[refreshToken] = user.email;
	return { accessToken, refreshToken };
};

const refreshTokenService = async (data) => {
	const { refreshToken } = data;
	if (refreshToken in refreshTokens) {
		return await jwt
			.verifyRefreshToken(refreshToken)
			.then(async (data) => {
				console.log("decoded email" + data.payload.email);
				if (refreshTokens[refreshToken] == data.payload.email) {
					const user = await prisma.user.findUnique({
						where: {
							email: data.payload.email,
						},
					});
					const token = jwt.signAccessToken(user);
					return token;
				}
			})
			.catch((e) => {
				return { error: "Error with refresh token" };
			});
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
