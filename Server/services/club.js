const prisma = require("../utils/prisma");

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

//delete club does not work 07-02-21
const deleteClub = async (id) => {
	try {
		await prisma.events.deleteMany({
			where: {
				clubid: parseInt(id),
			},
		});
		await prisma.races.deleteMany({
			//need to change this so it deletes the races based off each event id linked to a club
			where: {
				eventid: parseInt(id),
			},
		});

		await prisma.boats.deleteMany({
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
