const { Router } = require("express");
const { body, param } = require("express-validator");
const router = Router();
const {
	getAllTeams,
	postTeam,
	deleteTeam,
	updateTeam,
	getTeamByID,
} = require("../controllers/team");

const { validator } = require("../middleware/expressValidator");

router.route("/").get(getAllTeams);

router.route("/").post(
	[
		body("name").exists(),
		body("name").notEmpty().withMessage("This request requires a name field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postTeam
);

router.route("/:id").delete(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	deleteTeam
);

router.route("/:id").put(
	[
		param("id").isNumeric().withMessage("The id must be a numeric value"),
		body("name").exists(),
		body("name").notEmpty().withMessage("This request requires a name field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	updateTeam
);

router.route("/:id").get(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	getTeamByID
);

module.exports = router;
