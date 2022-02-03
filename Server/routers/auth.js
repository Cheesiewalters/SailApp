const { Router } = require("express");
const router = Router();
const {
	register,
	loginController,
	all,
	refreshTokenController,
} = require("../controllers/auth");
const auth = require("../middleware/auth");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

// register
// router.post("/", register);

router.route("/").post(
	[
		body("email").exists().isString(),
		body("email")
			.notEmpty()
			.withMessage("This request requires a valid email field"),
		body("password").exists().isString(),
		body("password")
			.notEmpty()
			.withMessage("This request requires a valid email field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	register
);

// // login
// router.post("/login", login);

router.route("/login").post(
	[
		body("email").exists().isString(),
		body("email")
			.notEmpty()
			.withMessage("This request requires a valid email field"),
		body("password").exists().isString(),
		body("password")
			.notEmpty()
			.withMessage("This request requires a valid email field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	loginController
);

// // refresh token
// router.post("/token", refreshToken);

router.route("/token").post(
	[],
	(req, res, next) => {
		validator(req, res, next);
	},
	refreshTokenController
);

// // all users
// router.get("/", auth, allf);

router.route("/").get(
	auth,
	(req, res, next) => {
		validator(req, res, next);
	},
	all
);

module.exports = router;
