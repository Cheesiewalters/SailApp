const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
	getAllMembersService,
	getMembersbyIDService,
	postMemberService,
	updatedMemberService,
	deleteMembersService,
} = require("../services/member");
const okStatus = 200;
const errorStatus = 500;

const getAllMembers = async (req, res) => {
	try {
		const members = await getAllMembersService();
		res.status(okStatus).json({
			members,
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "database error" });
	}
};

const postMember = async (req, res) => {
	try {
		const newMember = await postMemberService(req);
		res.status(okStatus).json({
			newMember,
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "database error" });
	}
};

const getMemberByID = async (req, res) => {
	try {
		const memberRoles = await getMembersbyIDService(req.params.id);

		res.status(okStatus).json({
			memberRoles,
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "database error" });
	}
};

const updateMember = async (req, res) => {
	try {
		const updatedMember = await updatedMemberService(req);
		res.status(okStatus).json({
			updatedMember,
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "database error" });
	}
};

const deleteMember = async (req, res) => {
	try {
		await deleteMembersService(req.params.id);
		res.status(okStatus).json({
			message: `Successfully deleted member with id: ${req.params.id}`,
		});
	} catch (error) {
		console.log(error);
		res.status(errorStatus).json({ error: "database error" });
	}
};

module.exports = {
	getAllMembers,
	getMemberByID,
	postMember,
	updateMember,
	deleteMember,
};
