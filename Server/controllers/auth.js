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
	try {
		const data = await refreshTokenService(req.body);
		console.log(data);
		res.status(createdStatus).json({
			accessToken: data,
		});
	} catch (e) {
		console.log(e);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const register = async (req, res) => {
	try {
		const accessToken = await registerService(req.body);
		res.status(createdStatus).json({
			accessToken: accessToken,
		});
	} catch (e) {
		console.log(e);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const login = async (req, res) => {
	try {
		const data = await loginService(req.body);
		res.status(200).json({
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
		});
	} catch (e) {
		console.log(e);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
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
