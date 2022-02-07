const prisma = require("../../utils/prisma");
const eventService = require("../event");
const { when } = require("jest-when");


jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("clubService", () => {
	describe("getAllEventTypes", () => {
		it("should return all event types", async () => {
			// arrange
			const eventTypes = { id: 1 };

			prisma.eventtypes = { findMany: jest.fn().mockReturnValueOnce(eventTypes) };

			//act
			const result = await eventService.getAllEventTypes();

			// assert
			expect(prisma.eventtypes.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(eventTypes);
		});
        it("should return all events", async () => {
			// arrange
			const events = { id: 1 };

			prisma.events = { findMany: jest.fn().mockReturnValueOnce(events) };

			//act
			const result = await eventService.getAllEvents();

			// assert
			expect(prisma.events.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(events);
		});
        it("should return all search event results", async () => {
            // arrange
			const events = { id: 1 };
            prisma.events = { findMany: jest.fn().mockReturnValueOnce(events) };
            const query = "event";

            const result = await eventService.searchEvent(query);
            expect(prisma.events.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(events);
        })
        it("should save an event and return the new event", async () => {
			// arrange
			const name = "name";
            const eventTypeId = 1;
            const startTime = "2021-12-02 09:15:15";
            const endDate = "2021-12-02 13:15:15";
            const clubId = 1;
            const description = "This is a description"

			const req = {
				body: { 
                    eventTypeId: eventTypeId,
                    startTime: startTime,
                    endDate: endDate,
                    name: name,
                    clubId: clubId,
                    description: description, 
                },
			};

			const newEvent = {
				eventtypeid: eventTypeId,
                starttime: startTime,
                enddate: endDate,
                name: name,
                clubid: clubId,
                description: description, 
			};

			prisma.events = { create: jest.fn().mockReturnValueOnce(newEvent) };

			//act
			const result = await eventService.postEvent(req);

			// assert
			// assert
			expect(prisma.events.create).toHaveBeenCalledWith(
				expect.objectContaining({
					data: {
                        eventtypeid: eventTypeId,
                        starttime: startTime,
                        enddate: endDate,
                        name: name,
                        clubid: clubId,
                        description: description, 
					},
				})
			);
			expect(prisma.events.create).toHaveBeenCalledTimes(1);
			expect(result).toBe(newEvent);
		});
        it("should update a event and return the updatedEvent", async () => {
			// arrange
			const id = 1;
			const name = "name";
            const eventTypeId = 1;
            const startTime = "2021-12-02T09:15:15.000Z";
            const endDate = "2021-12-02T09:15:15.000Z";
            const clubId = 1;
            const description = "This is a description"
			const req = {
				params: { id: id },
				body: { 
                    eventTypeId: eventTypeId,
                    startTime: startTime,
                    endDate: endDate,
                    name: name,
                    clubId: clubId,
                    description: description, 
                },
			};

			const updatedEvent = {
				eventTypeId: eventTypeId,
                startTime: startTime,
                endDate: endDate,
                name: name,
                clubId: clubId,
                description: description, 
			};

			prisma.events = { update: jest.fn().mockReturnValueOnce(updatedEvent) };

			//act
			const result = await eventService.updateEventService(req);

			// assert
			expect(prisma.events.update).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: id,
					},
					data: {
						eventtypeid: eventTypeId,
                        starttime: startTime,
                        enddate: endDate,
                        name: name,
                        clubid: clubId,
                        description: description, 
					},
				})
			);
			expect(prisma.events.update).toHaveBeenCalledTimes(1);
			expect(result).toBe(updatedEvent);
		});
        it("should remove an event", async () => {
			// arrange
			const id = 1;

			prisma.races = { deleteMany: jest.fn().mockReturnValueOnce() };
			prisma.events = { delete: jest.fn().mockReturnValueOnce() };

			//act
			await eventService.deleteEvent(id);

			// assert
			expect(prisma.races.deleteMany).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						eventid: parseInt(id),
					},
				})
			);
			expect(prisma.races.deleteMany).toHaveBeenCalledTimes(1);
			expect(prisma.events.delete).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: parseInt(id),
					},
				})
			);
			expect(prisma.events.delete).toHaveBeenCalledTimes(1);
		});
    })
})