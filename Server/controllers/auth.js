const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	registerService,
	loginService,
	allService,
} = require("../services/auth");
const okStatus = 200;
const serverErrorStatus = 500;

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
			status: true,
			message: "Account login successful",
			data,
		});
	} catch (e) {
		console.log(e);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const allf = async (req, res) => {
	try {
		const users = await allService();
		res.status(200).json({
			status: true,
			message: "All users",
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
	allf,
};
