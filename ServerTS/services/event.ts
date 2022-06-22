import { prisma } from "../utilities";
import * as moment from "moment";

async function getAllEventTypes() {
  return await prisma.eventtypes.findMany();
}

async function getAllEventsService() {
  return await prisma.events.findMany();
}

async function modifyEvents(events) {
  return await events.map((e) => {
    return {
      ...e,
      races: e.races.map((r) => {
        return {
          ...r,
          raceboats: r.raceboats.map((rb) => {
            return {
              ...rb,
              duration:
                (rb.finishtime.getTime() - rb.starttime.getTime()) / 1000,
            };
          }),
        };
      }),
    };
  });
}

async function getEventByID(id: number) {
  const events = await prisma.events.findMany({
    where: {
      id: id,
    },
    include: {
      clubs: {
        select: {
          name: true,
        },
      },
      eventtypes: {
        select: {
          name: true,
        },
      },
      races: {
        select: {
          id: true,
          starttime: true,
          class: true,
          raceboats: {
            select: {
              starttime: true,
              finishtime: true,
              position: true,
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
      },
    },
  });

  return modifyEvents(events);
}

async function postEventService(body: any) {
  const { eventTypeId, startTime, endDate, name, clubId, description } = body;

  return await prisma.events.create({
    data: {
      eventtypeid: eventTypeId,
      starttime: startTime,
      enddate: endDate,
      name: name,
      clubid: clubId,
      description: description,
    },
  });
}

async function updateEventService(body: any, id: number) {
  const { eventTypeId, startTime, endDate, name, clubId, description } = body;

  const updatedEventTypeID = parseInt(eventTypeId);
  const updatedclubId = parseInt(clubId);
  const updatedId = id;

  const updatedEvent = await prisma.events.update({
    where: {
      id: updatedId,
    },
    data: {
      eventtypeid: updatedEventTypeID,
      starttime: moment.utc(startTime).toISOString(),
      enddate: moment.utc(endDate).toISOString(),
      name: name,
      clubid: updatedclubId,
      description: description,
    },
  });
  return updatedEvent;
}

async function deleteEvent(id: number) {
  await prisma.races.deleteMany({
    where: {
      eventid: id,
    },
  });

  await prisma.events.delete({
    where: {
      id: id,
    },
  });
}

async function searchEvent(query: string) {
  const events = await prisma.events.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });
  return events;
}

const EventService = {
  getAllEventsService,
  getAllEventTypes,
  getEventByID,
  postEventService,
  updateEventService,
  deleteEvent,
  searchEvent,
};

export { EventService };
