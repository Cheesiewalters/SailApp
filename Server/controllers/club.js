const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getAllClubService,
	getClubByIdService,
	postClubService,
	updateClubService,
	deleteClubService,
	postClubMemberService,
} = require("../services/club");
const okStatus = 200;
const serverErrorStatus = 500;

const getAllClubs = async (req, res) => {
	try {
		const Clubs = await getAllClubService();
		res.status(okStatus).json({
			Clubs,
		});
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const getClubByID = async (req, res) => {
	try {
		const club = await getClubByIdService(req.params.id);
		res.status(okStatus).json({ club });
	} catch (error) {
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const postClub = async (req, res) => {
	try {
		const newClub = await postClubService(req);
		res.status(okStatus).json({
			newClub,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const postClubMember = async (req, res) => {
	try {
		const newClubMember = await postClubMemberService(req);
		res.status(okStatus).json({
			newClubMember,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const updateClub = async (req, res) => {
	try {
		const updatedClub = await updateClubService(req);
		res.status(okStatus).json({
			updatedClub,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

const deleteClub = async (req, res) => {
	try {
		await deleteClubService(req.params.id);
		res.status(okStatus).json({
			message: `Successfully deleted boat with id: ${req.params.id}`,
		});
	} catch (error) {
		console.log(error);
		res.status(serverErrorStatus).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	getAllClubs,
	getClubByID,
	postClub,
	postClubMember,
	updateClub,
	deleteClub,
};
