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

const refreshToken = async (req, res) => {
	try {
		const user = await refreshTokenService(req.body);
		res.status(okStatus).json({
			data: user,
		});
	} catch (e) {
		console.log(e);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const register = async (req, res) => {
	try {
		const user = await registerService(req.body);
		res.status(okStatus).json({
			message: "User created successfully",
			data: user,
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
			message: "Account login successful",
			data,
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
			message: "Sucessfully retrieved all users",
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
