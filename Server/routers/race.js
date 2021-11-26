const { Router } = require("express");
const router = Router();
const {
	getAllRaces,
	postRace,
	deleteRace,
	updateRace,
	getRaceByID,
	getAllRaceBoats,
	postRaceBoats,
} = require("../controllers/race");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/:id/boat").get(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	getAllRaceBoats
);
router.route("/:id/boat").post(
	[
		param("id").isNumeric().withMessage("The id must be a numeric value"),
		body("startTime")
			.notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
			.withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("finishTime")
			.notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
			.withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("position")
			.isNumeric()
			.notEmpty()
			.withMessage("The id must be a numeric value"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postRaceBoats
);
router.route("/").get(getAllRaces);
router.route("/").post(
	[
		body("eventId")
			.exists()
			.notEmpty()
			.withMessage("eventTypeId field cannot be null"),
		body("eventId")
			.isNumeric()
			.withMessage("eventTypeId Field must be a numeric value"),
		body("startTime")
			.notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
			.withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("classId")
			.exists()
			.notEmpty()
			.withMessage("classId field cannot be null"),
		body("classId")
			.isNumeric()
			.withMessage("classId Field must be a numeric value"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postRace
);
router.route("/:id").delete(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	deleteRace
);
router.route("/:id").put(
	[
		param("id").isNumeric().withMessage("The id must be a numeric value"),
		body("eventId")
			.exists()
			.notEmpty()
			.withMessage("eventTypeId field cannot be null"),
		body("eventId")
			.isNumeric()
			.withMessage("eventTypeId Field must be a numeric value"),
		body("startTime")
			.notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
			.withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("classId")
			.exists()
			.notEmpty()
			.withMessage("classId field cannot be null"),
		body("classId")
			.isNumeric()
			.withMessage("classId Field must be a numeric value"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	updateRace
);
router.route("/:id").get(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	getRaceByID
);

module.exports = router;
