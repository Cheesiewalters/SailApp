const { PrismaClient } = require("@prisma/client");
const { deleteBoat } = require("../controllers/boat");
const { deleteTeam } = require("../controllers/team");
const prisma = new PrismaClient();

const getAllBoatsService = async () => {
	return await prisma.boats.findMany();
};

const getBoatsByIdService = async (id) => {
	return await prisma.boats.findMany({
		where: {
			id: parseInt(id),
		},
	});
};

const postBoatService = async (req) => {
	const { typeId, classId, ownerId, teamId, name } = req.body;
	const newBoat = await prisma.boats.create({
		data: {
			name: name,
			typeid: typeId,
			classid: classId,
			ownerid: ownerId,
			teamid: teamId,
		},
	});
	return newBoat;
};

const updateBoatService = async (req) => {
	const { typeId, classId, ownerId, teamId, name } = req.body;
	const updatedId = parseInt(req.params.id);
	const updatedBoat = await prisma.boats.update({
		where: {
			id: updatedId,
		},
		data: {
			name: name,
			typeid: parseInt(typeId),
			classid: parseInt(classId),
			ownerid: parseInt(ownerId),
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

exports.deleteBoatService = deleteBoatService;
exports.updateBoatService = updateBoatService;
exports.postBoatService = postBoatService;
exports.getAllBoatsService = getAllBoatsService;
exports.getBoatsByIdService = getBoatsByIdService;
