const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	createUser,
	login,
	getAllUsers,
	refreshToken,
} = require("../services/auth");
const okStatus = 200;
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
	if (!data || data.length === 0) return res.sendStatus(500);

	res.status(200).json({
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
	});
};

const all = async (req, res) => {
	try {
		const users = await getAllUsers();
		res.status(200).json({
			data: users,
		});
	} catch (e) {
		console.log(e);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	register,
	loginController,
	all,
	refreshTokenController,
};
