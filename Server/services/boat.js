const prisma = require("../utils/prisma");

const getBoats = async () => {
	return await prisma.boats.findMany();
};

const getAllBoatClassesService = async () => {
	return await prisma.renamedclass.findMany();
};

const getBoatsById = async (id) => {
	return await prisma.boats.findMany({
		where: {
			id: parseInt(id),
		},
	});
};

const saveBoat = async (req) => {
	const { classId, clubId, name, sailNo } = req.body;
	const newBoat = await prisma.boats.create({
		data: {
			name: name,
			classid: classId,
			clubid: clubId,
			sailno: sailNo,
		},
	});
	return newBoat;
};

const updateBoat = async (req) => {
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
		},
	});
	return updatedBoat;
};

const removeBoat = async (id) => {
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
exports.removeBoat = removeBoat;
exports.updateBoat = updateBoat;
exports.saveBoat = saveBoat;
exports.getBoats = getBoats;
exports.getBoatsById = getBoatsById;
