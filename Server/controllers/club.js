const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getClubs,
	getClubById,
	createClub,
	updateClub,
	deleteClub,
} = require("../services/club");
const okStatus = 200;
const serverErrorStatus = 500;

const getAllClubs = async (req, res) => {
	const Clubs = await getClubs();
	if (!Clubs || Clubs.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(Clubs);
};

const getClubByIDController = async (req, res) => {
	const club = await getClubById(req.params.id);
	if (!club || club.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(club);
};

const postClub = async (req, res) => {
	const newClub = await createClub(req);
	if (!newClub || newClub.length === 0)
		return res.sendStatus(serverErrorStatus);
	res.status(okStatus).json({
		newClub,
	});
};

const updateClubController = async (req, res) => {
	const updatedClub = await updateClub(req);
	if (!updatedClub || updatedClub.length === 0) return res.sendStatus(400);
	res.status(okStatus).json({
		updatedClub,
	});
};

const deleteClubController = async (req, res) => {
	const deletedCLub = await deleteClub(req.params.id);
	if (!deletedCLub || deletedCLub.length === 0) return res.sendStatus(500);

	res.status(okStatus).json({
		message: `Successfully deleted club with id: ${req.params.id}`,
	});
};

module.exports = {
	getAllClubs,
	getClubByIDController,
	postClub,
	updateClubController,
	deleteClubController,
};
