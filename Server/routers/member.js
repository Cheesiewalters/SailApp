const { Router } = require("express");
const router = Router();
const {
	getAllMembers,
	getMemberByID,
	postMember,
	updateMember,
	deleteMember,
} = require("../controllers/member");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/").get(getAllMembers);
router.route("/").post(
	[
		body("firstName")
			.exists()
			.isString()
			.notEmpty()
			.withMessage("firstName is required in this context"),
		body("lastName")
			.exists()
			.isString()
			.notEmpty()
			.withMessage("lastName is required in this context"),
		body("email")
			.exists()
			.isEmail()
			.notEmpty()
			.withMessage("email is required in this context"),
		body("password")
			.exists()
			.isString()
			.notEmpty()
			.withMessage("password is required in this context"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postMember
);
router.route("/:id").delete(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	deleteMember
);
router.route("/:id").put(
	[
		param("id").isNumeric().withMessage("The id must be a numeric value"),
		body("firstName")
			.exists()
			.isString()
			.notEmpty()
			.withMessage("firstName is required in this context"),
		body("lastName")
			.exists()
			.isString()
			.notEmpty()
			.withMessage("lastName is required in this context"),
		body("email")
			.exists()
			.isEmail()
			.notEmpty()
			.withMessage("email is required in this context"),
		body("password")
			.exists()
			.isString()
			.notEmpty()
			.withMessage("password is required in this context"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	updateMember
);
router.route("/:id").get(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	getMemberByID
);

module.exports = router;
