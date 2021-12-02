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

exports.postBoatService = postBoatService;
exports.getAllBoatsService = getAllBoatsService;
exports.getBoatsByIdService = getBoatsByIdService;
