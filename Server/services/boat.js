const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllBoatsService = async () => {
	return await prisma.boats.findMany();
};

const getAllBoatClassesService = async () => {
	return await prisma.renamedclass.findMany();
};

const getBoatsByIdService = async (id) => {
	return await prisma.boats.findMany({
		where: {
			id: parseInt(id),
		},
	});
};

const postBoatService = async (req) => {
	const { classId, clubId, teamId, name, sailNo } = req.body;
	const newBoat = await prisma.boats.create({
		data: {
			name: name,
			classid: classId,
			clubid: clubId,
			sailno: sailNo,
			teamid: teamId,
		},
	});
	return newBoat;
};

const updateBoatService = async (req) => {
	const { classId, clubId, teamId, name, sailNo } = req.body;
	const updatedId = parseInt(req.params.id);
	const updatedBoat = await prisma.boats.update({
		where: {
			id: updatedId,
		},
		data: {
			name: name,
			classid: parseInt(classId),
			clubid: parseInt(clubId),
			sailno: sailNo,
			teamid: parseInt(teamId),
		},
	});
	return updatedBoat;
};

const deleteBoatService = async (id) => {
	try {
		await prisma.raceboats.deleteMany({
			where: {
				boatid: parseInt(id),
			},
		});
		await prisma.boats.delete({
			where: {
				id: parseInt(id),
			},
		});
	} catch (e) {
		console.log(e);
	}
};

exports.getAllBoatClassesService = getAllBoatClassesService;
exports.deleteBoatService = deleteBoatService;
exports.updateBoatService = updateBoatService;
exports.postBoatService = postBoatService;
exports.getAllBoatsService = getAllBoatsService;
exports.getBoatsByIdService = getBoatsByIdService;
