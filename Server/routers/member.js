const { Router } = require("express");
const router = Router();
const {
	getAllMemberRoles,
	postMemberRoles,
	getAllMembers,
	getMemberByID,
	postMember,
	updateMember,
	deleteMember,
} = require("../controllers/member");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/roles").get(getAllMemberRoles);
router.route("/roles").post(
	[
		body("role")
			.notEmpty()
			.withMessage("This request requires a valid role field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postMemberRoles
);
router.route("/").get(getAllMembers);
router.route("/").post(
	[
		body("name").exists().isString(),
		body("roleId")
			.isNumeric()
			.notEmpty()
			.withMessage("roleId field cannot be null"),
		body("roleId")
			.isNumeric()
			.withMessage("roleId Field must be a numeric value"),
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
		body("name").exists().isString(),
		body("name")
			.notEmpty()
			.withMessage("This request requires a valid name field"),
		body("roleId")
			.isNumeric()
			.notEmpty()
			.withMessage("roleId field cannot be null"),
		body("roleId")
			.isNumeric()
			.withMessage("roleId Field must be a numeric value"),
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
