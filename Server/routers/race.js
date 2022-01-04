const { Router } = require("express");
const router = Router();
const {
	getAllRaces,
	postRace,
	deleteRace,
	updateRace,
	getRaceByID,
	postRaceBoats,
	getAllRaceBoatsByID,
	deleteAllRaceBoatsById,
	updateRaceBoatByBoatId,
	getRaceBoatByBoatId,
} = require("../controllers/race");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/:id/boat").post(
	[
		param("id").isNumeric().withMessage("The id must be a numeric value"),
		body("startTime").isISO8601().toDate(),
		// .notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
		// .withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("finishTime").isISO8601().toDate(),
		// .notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
		// .withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
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
router.route("/:id/boat").get(getAllRaceBoatsByID);

router.route("/:id/boat/:id2").delete(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	[param("id2").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	deleteAllRaceBoatsById
);

router.route("/:id/boat/").put(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	[
		body("startTime").isISO8601().toDate(),
		body("finishTime").isISO8601().toDate(),
		body("position")
			.exists()
			.notEmpty()
			.withMessage("position field cannot be null"),
		body("boatId")
			.exists()
			.notEmpty()
			.withMessage("boatId field cannot be null"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	updateRaceBoatByBoatId
);

router.route("/:id/boat/:id2").get(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	[param("id2").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	getRaceBoatByBoatId
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
		body("startTime").isISO8601().toDate(),
		// .notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
		// .withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
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
			.isNumeric()
			.withMessage("eventId field cannot be null"),
		body("startTime")
			.notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
			.withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("classId")
			.exists()
			.notEmpty()
			.isNumeric()
			.withMessage("classId field cannot be null"),
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
