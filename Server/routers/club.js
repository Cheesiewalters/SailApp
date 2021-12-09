const { Router } = require("express");
const router = Router();
const {
	getAllClubs,
	postClub,
	deleteClub,
	updateClub,
	getClubByID,
	postClubMember,
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

router.route("/:id/member").post(
	[
		param("id").isNumeric().withMessage("The id must be a numeric value"),
		body("clubId")
			.exists()
			.notEmpty()
			.isNumeric()
			.withMessage("This request requires a valid clubId field"),
		body("memberId")
			.exists()
			.notEmpty()
			.isNumeric()
			.withMessage("This request requires a valid memberId field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postClubMember
);

router.route("/:id").delete(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	deleteClub
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
	updateClub
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
	getClubByID
);

module.exports = router;
