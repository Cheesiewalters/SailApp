const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	registerService,
	loginService,
	allService,
	refreshTokenService,
} = require("../services/auth");
const okStatus = 200;
const serverErrorStatus = 500;
const createdStatus = 201;

const refreshToken = async (req, res) => {
	const data = await refreshTokenService(req.body);
	if (!data || data.length === 0) return res.sendStatus(204);
	res.status(createdStatus).json({
		accessToken: data,
	});
};

const register = async (req, res) => {
	const accessToken = await registerService(req.body);
	if (!accessToken || accessToken.length === 0) return res.sendStatus(500);

	res.status(createdStatus).json({
		accessToken: accessToken,
	});
};

const login = async (req, res) => {
	const data = await loginService(req.body);
	if (!data || data.length === 0) return res.sendStatus(500);

	res.status(200).json({
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
	});
};

const all = async (req, res) => {
	try {
		const users = await allService();
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
	login,
	all,
	refreshToken,
};
