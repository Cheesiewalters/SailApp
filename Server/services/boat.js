const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllBoatsService = () => {
	return prisma.boats.findMany();
};

const getBoatsByIdService = (id) => {
	return prisma.boats.findMany({
		where: {
			id: parseInt(id),
		},
	});
};

const postBoatService = (req) => {
	const newBoat = prisma.boats.create({
		data: {
			name: req.body.name,
			typeid: req.body.typeId,
			classid: req.body.classId,
			ownerid: req.body.ownerId,
			teamid: req.body.teamId,
		},
	});
	return newBoat;
};

const updateBoatService = (req) => {
	const updatedId = parseInt(req.params.id);
	const updatedBoat = prisma.boats.update({
		where: {
			id: updatedId,
		},
		data: {
			name: req.body.name,
			typeid: parseInt(req.body.typeId),
			classid: parseInt(req.body.classId),
			ownerid: parseInt(req.body.ownerId),
			teamid: parseInt(req.body.teamId),
		},
	});
	return updatedBoat;
};

exports.updateBoatService = updateBoatService;
exports.postBoatService = postBoatService;
exports.getAllBoatsService = getAllBoatsService;
exports.getBoatsByIdService = getBoatsByIdService;
