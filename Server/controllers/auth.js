const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	createUser,
	login,

	refreshToken,
} = require("../services/auth");
const okStatus = 200;
const userService = require("../services/user");
const serverErrorStatus = 500;
const createdStatus = 201;

const refreshTokenController = async (req, res) => {
	const data = await refreshToken(req.body);
	if (!data || data.length === 0) return res.sendStatus(400);
	res.status(okStatus).json({
		accessToken: data,
	});
};

const register = async (req, res) => {
	await createUser(req.body);

	res.status(createdStatus).json();
};

const loginController = async (req, res) => {
	const data = await login(req.body);
	if (!data || data.length === 0) return res.sendStatus(serverErrorStatus);

	res.status(200).json({
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
	});
};

const all = async (req, res) => {
	const users = await userService.getAllUsers();
	if (!users || users.length === 0) return res.sendStatus(404);
	res.status(200).json({
		data: users,
	});
};

const getUserByEmailController = async (req, res) => {
	const users = await getUserByEmail(req.body);
	if (!users || users.length === 0) return res.sendStatus(404);
	res.status(200).json({
		data: users,
	});
};

module.exports = {
	register,
	loginController,
	all,
	refreshTokenController,
	getUserByEmailController,
};
