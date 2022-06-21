import { prisma } from "../utilities";

async function getBoats() {
  return await prisma.boats.findMany();
}

async function getAllClasses() {
  return await prisma.renamedclass.findMany();
}

async function getBoatsById(id: number) {
  return await prisma.boats.findMany({
    where: {
      id: id,
    },
  });
}

async function saveBoat(body: any) {
  const { classId, clubId, name, sailNo } = body;
  return await prisma.boats.create({
    data: {
      name: name,
      classid: classId,
      clubid: clubId,
      sailno: sailNo,
    },
  });
}

async function updateBoat(body: any, id: number) {
  const { classId, clubId, name, sailNo } = body;
  const updatedBoat = await prisma.boats.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      classid: Number(classId),
      clubid: Number(clubId),
      sailno: sailNo,
    },
  });
  return updatedBoat;
}

async function removeBoat(id: number) {
  await prisma.raceboats.deleteMany({
    where: {
      boatid: id,
    },
  });
  await prisma.boats.delete({
    where: {
      id: id,
    },
  });
}

const BoatService = {
  getBoats,
  getAllClasses,
  getBoatsById,
  saveBoat,
  updateBoat,
  removeBoat,
};

export { BoatService };
