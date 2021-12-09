const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllClubService = async () => {
	return await prisma.clubs.findMany();
};

const getClubByIdService = async (id) => {
	return await prisma.clubs.findMany({
		where: {
			id: parseInt(id),
		},
		include: {
			club_member: {
				select: {
					members: {
						select: {
							id: true,
							firstname: true,
							lastname: true,
							email: true,
						},
					},
				},
			},
		},
	});
};

const postClubService = async (req) => {
	const { name } = req.body;
	const newClub = await prisma.clubs.create({
		data: {
			name: name,
		},
	});
	return newClub;
};

const postClubMemberService = async (req) => {
	const { clubId, memberId } = req.body;
	const newClubMember = await prisma.club_member.create({
		data: {
			clubid: clubId,
			memberid: memberId,
		},
	});
	return newClubMember;
};

const updateClubService = async (req) => {
	const { name } = req.body;
	const updatedId = parseInt(req.params.id);
	const updatedClub = await prisma.clubs.update({
		where: {
			id: updatedId,
		},
		data: {
			name: name,
		},
	});
	return updatedClub;
};

const deleteClubService = async (id) => {
	try {
		await prisma.club_member.deleteMany({
			where: {
				clubid: parseInt(id),
			},
		});
		await prisma.clubs.delete({
			where: {
				id: parseInt(id),
			},
		});
	} catch (e) {
		console.log(e);
	}
};

exports.deleteClubService = deleteClubService;
exports.updateClubService = updateClubService;
exports.postClubService = postClubService;
exports.getAllClubService = getAllClubService;
exports.getClubByIdService = getClubByIdService;
exports.postClubMemberService = postClubMemberService;
