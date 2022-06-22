const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

function signAccessToken(payload) {
  return jwt.sign({ payload }, accessTokenSecret, { expiresIn: "1h" });
}
function signRefreshToken(payload) {
  return jwt.sign({ payload }, refreshTokenSecret, { expiresIn: "20d" });
}
function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, refreshTokenSecret, (err, payload) => {
      if (err) {
        const message =
          err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        return reject(message);
      }
      resolve(payload);
    });
  });
}
function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        const message =
          err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        return reject(message);
      }
      resolve(payload);
    });
  });
}

export {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
