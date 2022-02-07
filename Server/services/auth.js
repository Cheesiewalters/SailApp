const prisma = require("../utils/prisma");
const userService = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("../middleware/jwt");

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
	const user = await userService.getUserByEmail(email);
	if (!user) {
		throw new Error("User not found");
	}
	const checkPassword = bcrypt.compareSync(password, user.password);
	if (!checkPassword) throw new Error("Password is incorrect");
	const accessToken = jwt.signAccessToken({
		userid: user.id,
		userRole: user.roleid,
	});
	const refreshToken = jwt.signRefreshToken({
		userid: user.id,
		userRole: user.roleid,
	});
	return { accessToken, refreshToken };
};

const refreshToken = async ({ refreshToken }) => {
	var decodedToken = await jwt.verifyRefreshToken(refreshToken);
	const user = await prisma.user.findUnique({
		where: {
			id: decodedToken.payload.userid,
		},
	});
	const rT = jwt.signAccessToken({
		userid: user.id,
		userRole: user.roleid,
	});
	return rT;
};

exports.refreshToken = refreshToken;
exports.login = login;
exports.createUser = createUser;
