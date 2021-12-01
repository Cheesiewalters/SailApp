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

exports.getAllBoatsService = getAllBoatsService;
exports.getBoatsByIdService = getBoatsByIdService;
