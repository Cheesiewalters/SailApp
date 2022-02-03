const { Router } = require("express");
const router = Router();
const {
	getEventTypes,
	getAllEventsController,
	getEventByIDController,
	deleteEventController,
	updateEvent,
	postEventController,
	searchEventController,
} = require("../controllers/event");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/types").get(getEventTypes);
router.route("/").get(getAllEventsController);

router.route("/search/").get((req, res, next) => {
	validator(req, res, next);
}, searchEventController);

router.route("/").post(
	[
		body("eventTypeId")
			.notEmpty()
			.withMessage("eventTypeId field cannot be null"),
		body("eventTypeId")
			.isNumeric()
			.withMessage("eventTypeId Field must be a numeric value"),
		body("startTime").isISO8601().toDate(),
		// .notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
		// .withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("endDate").isISO8601().toDate(),
		// .notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
		// .withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("name").exists().isString(),
		body("name")
			.notEmpty()
			.withMessage("This request requires a valid name field"),
		body("clubId")
			.isNumeric()
			.notEmpty()
			.withMessage("creatorId field cannot be null"),
		body("description").exists().isString(),
		body("description")
			.notEmpty()
			.withMessage("This request requires a valid descrription field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postEventController
);
router.route("/:id").delete(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	deleteEventController
);
router.route("/:id").put(
	[
		param("id").isNumeric().withMessage("The id must be a numeric value"),
		body("eventTypeId")
			.exists()
			.notEmpty()
			.withMessage("eventTypeId field cannot be null"),
		body("eventTypeId")
			.isNumeric()
			.withMessage("eventTypeId Field must be a numeric value"),
		body("startTime")
			.notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
			.withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("endDate")
			.notEmpty({ format: "DD/MM/YYYY HH:MM:SS" })
			.withMessage("the format is not correct, dd-mm-yyyy hh:mm:ss"),
		body("name").exists().isString(),
		body("name")
			.notEmpty()
			.withMessage("This request requires a valid name field"),
		body("clubId")
			.isNumeric()
			.notEmpty()
			.withMessage("creatorId field cannot be null"),
		body("description").exists().isString(),
		body("description")
			.notEmpty()
			.withMessage("This request requires a valid description field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	updateEvent
);
router.route("/:id").get(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	getEventByIDController
);

module.exports = router;
