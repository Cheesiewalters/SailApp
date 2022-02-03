const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getClubs = async () => {
	return await prisma.clubs.findMany();
};

const getClubById = async (id) => {
	return await prisma.clubs.findUnique({
		where: {
			id: parseInt(id),
		},
	});
};

const createClub = async (req) => {
	const { name } = req.body;
	const newClub = await prisma.clubs.create({
		data: {
			name: name,
		},
	});
	return newClub;
};

const updateClub = async (req) => {
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

const deleteClub = async (id) => {
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

exports.deleteClub = deleteClub;
exports.updateClub = updateClub;
exports.createClub = createClub;
exports.getClubs = getClubs;
exports.getClubById = getClubById;
