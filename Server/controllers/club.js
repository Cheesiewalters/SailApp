const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getAllClubService,
	getClubByIdService,
	postClubService,
	updateClubService,
	deleteClubService,
} = require("../services/club");
const okStatus = 200;
const serverErrorStatus = 500;

const getAllClubs = async (req, res) => {
	const Clubs = await getAllClubService();
	if (!Clubs || Clubs.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(Clubs);
};

const getClubByID = async (req, res) => {
	const club = await getClubByIdService(req.params.id);
	if (!club || club.length === 0) return res.sendStatus(204);
	res.status(okStatus).json(club);
};

const postClub = async (req, res) => {
	const newClub = await postClubService(req);
	if (!newClub || newClub.length === 0)
		return res.sendStatus(serverErrorStatus);
	res.status(okStatus).json({
		newClub,
	});
};

const updateClub = async (req, res) => {
	const updatedClub = await updateClubService(req);
	if (!updatedClub || updatedClub.length === 0) return res.sendStatus(400);
	res.status(okStatus).json({
		updatedClub,
	});
};

const deleteClub = async (req, res) => {
	const deletedCLub = await deleteClubService(req.params.id);
	if (!deletedCLub || deletedCLub.length === 0) return res.sendStatus(500);

	res.status(okStatus).json({
		message: `Successfully deleted club with id: ${req.params.id}`,
	});
};

module.exports = {
	getAllClubs,
	getClubByID,
	postClub,
	updateClub,
	deleteClub,
};
