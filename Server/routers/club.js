const { Router } = require("express");
const router = Router();
const {
	getAllClubs,
	postClub,
	deleteClubController,
	updateClubController,
	getClubByIDController,
} = require("../controllers/club");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/").get(getAllClubs);

router.route("/").post(
	[
		body("name").exists().isString(),
		body("name")
			.notEmpty()
			.withMessage("This request requires a valid name field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postClub
);

router.route("/:id").delete(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	deleteClubController
);
router.route("/:id").put(
	[
		body("name")
			.exists()
			.notEmpty()
			.withMessage("This request requires a name field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	updateClubController
);
router.route("/:id").get(
	[
		param("id")
			.isNumeric()
			.withMessage("Id in parameter must be a numeric value"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	getClubByIDController
);

module.exports = router;
