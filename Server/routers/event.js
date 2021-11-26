const { Router } = require("express");
const router = Router();
const {
	getEventTypes,
	getAllEvents,
	getEventByID,
	postEvent,
	updateEvent,
	deleteEvent,
} = require("../controllers/event");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/types").get(getEventTypes);
router.route("/").get(getAllEvents);
router.route("/").post(
	[
		body("eventTypeId")
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
		body("creatorId")
			.isNumeric()
			.notEmpty()
			.withMessage("creatorId field cannot be null"),
		body("creatorId")
			.isNumeric()
			.withMessage("creatorId Field must be a numeric value"),
		body("description").exists().isString(),
		body("description")
			.notEmpty()
			.withMessage("This request requires a valid name field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postEvent
);
router.route("/:id").delete(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	deleteEvent
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
		body("creatorId")
			.isNumeric()
			.notEmpty()
			.withMessage("creatorId field cannot be null"),
		body("creatorId")
			.isNumeric()
			.withMessage("creatorId Field must be a numeric value"),
		body("description").exists().isString(),
		body("description")
			.notEmpty()
			.withMessage("This request requires a valid name field"),
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
	getEventByID
);

module.exports = router;
