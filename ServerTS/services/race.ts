import { prisma } from "../utilities";
import * as moment from "moment";

async function getRaces() {
  return await prisma.races.findMany();
}

async function getRaceID(id: number) {
  return await prisma.races.findMany({
    where: {
      id: id,
    },
    include: {
      raceboats: {
        select: {
          id: true,
          position: true,
          starttime: true,
          finishtime: true,
          boats: {
            select: {
              id: true,
              name: true,
              classid: true,
            },
          },
        },
      },
    },
  });
}

async function getRaceBoat(id: number) {
  return await prisma.raceboats.findMany({
    where: {
      raceid: id,
    },
  });
}

async function createRace(body: any) {
  const { eventId, classId, startTime } = body;
  return await prisma.races.create({
    data: {
      eventid: eventId,
      classid: classId,
      starttime: moment.utc(startTime).toISOString(),
    },
  });
}

const updateRaces = async (body: any, id: number) => {
  const { eventId, classId, startTime } = body;

  const updatedRace = await prisma.races.update({
    where: {
      id: id,
    },
    data: {
      eventid: parseInt(eventId),
      classid: parseInt(classId),
      starttime: moment.utc(startTime).toISOString(),
    },
  });
  return updatedRace;
};

const removeRace = async (id: number) => {
  try {
    await prisma.raceboats.deleteMany({
      where: {
        raceid: id,
      },
    });

    await prisma.races.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createRaceBoat = async (body: any, id: number) => {
  try {
    const { boatId, finishTime, startTime, position } = body;
    await prisma.raceboats.create({
      data: {
        raceid: id,
        boatid: parseInt(boatId),
        starttime: moment.utc(startTime).toISOString(),
        finishtime: moment.utc(finishTime).toISOString(),
        position: position,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRaceBoatsByID = async (id2: number) => {
  await prisma.raceboats.deleteMany({
    where: {
      boatid: id2,
    },
  });
};

const updateRaceBoat = async (body: any, id: number) => {
  try {
    const { boatId, finishTime, startTime, position } = body;

    const updatedRace = await prisma.raceboats.updateMany({
      where: {
        raceid: id,
        boatid: parseInt(boatId),
      },
      data: {
        position: parseInt(position),
        starttime: moment.utc(startTime).toISOString(),
        finishtime: moment.utc(finishTime).toISOString(),
      },
    });
    return updatedRace;
  } catch (error) {
    console.log(error);
  }
};

const getRaceBoatByBoat = async (id: number, id2: number) => {
  try {
    return await prisma.raceboats.findMany({
      where: {
        raceid: id,
        boatid: id2,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const RaceService = {
  getRaces,
  getRaceID,
  getRaceBoat,
  createRace,
  updateRaces,
  removeRace,
  createRaceBoat,
  deleteRaceBoatsByID,
  updateRaceBoat,
  getRaceBoatByBoat,
};

export { RaceService };
