const { Router } = require("express");
const router = Router();
const {
	getAllBoats,
	postBoat,
	deleteBoat,
	updateBoat,
	getBoatByID,
	getAllClasses,
} = require("../controllers/boat");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/").get(getAllBoats);
router.route("/class").get(getAllClasses);
router.route("/").post(
	[
		body("classId").notEmpty().withMessage("ClassId field cannot be null"),
		body("classId")
			.isNumeric()
			.withMessage("ClassId Field must be a numeric value"),
		body("clubId")
			.isNumeric()
			.notEmpty()
			.withMessage("clubId field cannot be null"),
		body("name").exists().isString(),
		body("name")
			.notEmpty()
			.withMessage("This request requires a valid name field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	postBoat
);
router.route("/:id").delete(
	[param("id").isNumeric().withMessage("The id must be a numeric value")],
	(req, res, next) => {
		validator(req, res, next);
	},
	deleteBoat
);
router.route("/:id").put(
	[
		param("id")
			.isNumeric()
			.withMessage("Id in parameter must be a numeric value"),
		body("classId").notEmpty().withMessage("ClassId field cannot be null"),
		body("classId")
			.isNumeric()
			.withMessage("ClassId Field must be a numeric value"),
		body("clubId")
			.isNumeric()
			.notEmpty()
			.withMessage("clubId field cannot be null"),
		body("name").exists(),
		body("name").notEmpty().withMessage("This request requires a name field"),
	],
	(req, res, next) => {
		validator(req, res, next);
	},
	updateBoat
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
	getBoatByID
);

module.exports = router;
