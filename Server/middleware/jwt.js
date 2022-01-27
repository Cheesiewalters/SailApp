const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
module.exports = {
	signAccessToken(payload) {
		return jwt.sign({ payload }, accessTokenSecret, { expiresIn: "7h" });
	},
	signRefreshToken(payload) {
		return jwt.sign({ payload }, refreshTokenSecret, { expiresIn: "7h" });
	},
	verifyRefreshToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, refreshTokenSecret, (err, payload) => {
				if (err) {
					const message =
						err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
					return reject(createError.Unauthorized(message));
				}
				resolve(payload);
			});
		});
	},
	verifyAccessToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, accessTokenSecret, (err, payload) => {
				if (err) {
					const message =
						err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
					return reject(createError.Unauthorized(message));
				}
				resolve(payload);
			});
		});
	},
};
