import { prisma } from "../utilities";

async function getClubs() {
  return await prisma.clubs.findMany();
}

async function createClub(body: any) {
  const name = body.name;
  const newClub = await prisma.clubs.create({
    data: {
      name: name,
    },
  });
  return newClub;
}

async function deleteClub(id: number) {
  try {
    await prisma.events.deleteMany({
      where: {
        clubid: id,
      },
    });
    await prisma.races.deleteMany({
      where: {
        eventid: id,
      },
    });

    await prisma.boats.deleteMany({
      where: {
        clubid: id,
      },
    });
    await prisma.clubs.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

async function updateClub(body: any, id: number) {
  const { name } = body;
  const updatedId = id;
  const updatedClub = await prisma.clubs.update({
    where: {
      id: updatedId,
    },
    data: {
      name: name,
    },
  });
  return updatedClub;
}

async function getClubById(id: number) {
  return await prisma.clubs.findUnique({
    where: {
      id: id,
    },
  });
}

const ClubService = {
  getClubs,
  createClub,
  deleteClub,
  updateClub,
  getClubById,
};

export { ClubService };
