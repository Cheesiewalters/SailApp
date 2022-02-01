const eventController = require("../controllers/event");
const eventService = require("../services/event");

jest.mock("../services/event");

describe("Event controller", () => {
	describe("getAllEvents", () => {
		it("should return 204 Response when no events are available", async () => {
			// arrange
			eventService.getAllEventsService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await eventController.getAllEvents(undefined, res);

			// assert
			expect(eventService.getAllEventsService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when events available", async () => {
			// arrange
			const events = [{ id: 1 }];
			eventService.getAllEventsService.mockReturnValueOnce(events);

			const res = {};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await eventController.getAllEvents(undefined, res);

			// assert
			expect(eventService.getAllEventsService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining([{ id: 1 }])
			);
		});
	});
	describe("getEventTypes", () => {
		it("should return 204 Response when no eventsTypes are available", async () => {
			// arrange
			eventService.getAllEventTypes.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await eventController.getEventTypes(undefined, res);

			// assert
			expect(eventService.getAllEventTypes).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when eventTypes available", async () => {
			// arrange
			const eventTypes = [{ id: 1 }];
			eventService.getAllEventTypes.mockReturnValueOnce(eventTypes);

			const res = {};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await eventController.getEventTypes(undefined, res);

			// assert
			expect(eventService.getAllEventTypes).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining([{ id: 1 }])
			);
		});
	});
	describe("getEventByID", () => {
		it("should return 204 Response when no getEventByID are available", async () => {
			// arrange
			eventService.getAllEventTypes.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await eventController.getEventTypes(undefined, res);

			// assert
			expect(eventService.getAllEventTypes).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when getEventByID available", async () => {
			// arrange
			const eventTypes = [{ id: 1 }];
			eventService.getAllEventTypes.mockReturnValueOnce(eventTypes);

			const res = {};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await eventController.getEventTypes(undefined, res);

			// assert
			expect(eventService.getAllEventTypes).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining([{ id: 1 }])
			);
		});
	});
	describe("postEvent", () => {
		it("should return 204 Response postEvent throws an error", async () => {
			// arrange
			eventService.postEventService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await eventController.postEvent(undefined, res);

			// assert
			expect(eventService.postEventService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when postEvent is successfull", async () => {
			// arrange
			const newEvent = [{ id: 1 }];
			eventService.postEventService.mockReturnValueOnce(newEvent);

			const res = {};
			const id = 1;
			const name = "new event";
			const req = {
				body: {
					eventtypeid: id,
					starttime: "2021-11-13T12:00:00.000Z",
					enddate: "2021-11-15T12:00:00.000Z",
					name: name,
					clubid: id,
					description: "This is a descriptions",
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await eventController.postEvent(req, res);

			// assert
			expect(eventService.postEventService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining([{ id: 1 }])
			);
		});
	});
	describe("deleteEvent", () => {
		it("should return 204 Response deleteEvent throws an error", async () => {
			// arrange
			eventService.deleteEventService.mockReturnValueOnce([]);

			const id = 1;
			const req = {
				params: {
					id: id,
				},
			};

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await eventController.deleteEvent(req, res);

			// assert
			expect(eventService.deleteEventService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(500);
		});

		it("should return 200 Response when deleteEvent is successfull", async () => {
			// arrange
			const deletedEvent = [
				{ message: `Successfully deleted event with id: 1` },
			];
			eventService.deleteEventService.mockReturnValueOnce(deletedEvent);

			const res = {};
			const id = 1;

			const req = {
				params: {
					id: id,
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await eventController.deleteEvent(req, res);

			// assert
			expect(eventService.deleteEventService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({
					message: `Successfully deleted event with id: 1`,
				})
			);
		});
	});
	describe("updateEvent", () => {
		it("should return 204 Response updateEvent throws an error", async () => {
			// arrange
			eventService.updateEventService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await eventController.updateEvent(undefined, res);

			// assert
			expect(eventService.updateEventService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(400);
		});

		it("should return 200 Response when updateEvent is successfull", async () => {
			// arrange
			const updatedEvent = [{ id: 1 }];
			eventService.updateEventService.mockReturnValueOnce(updatedEvent);

			const res = {};
			const id = 1;
			const sailno = 1234;
			const name = "new boat";
			const req = {
				body: {
					eventtypeid: id,
					starttime: "2021-11-13T12:00:00.000Z",
					enddate: "2021-11-15T12:00:00.000Z",
					name: name,
					clubid: id,
					description: "This is a descriptions",
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await eventController.updateEvent(req, res);

			// assert
			expect(eventService.updateEventService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining([{ id: 1 }])
			);
		});
	});
	describe("searchEvent", () => {
		it("should return 204 Response searchEvent throws an error", async () => {
			// arrange
			eventService.searchEventService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};
			const req = {
				query: {
					q: "search query",
				},
			};

			// act
			await eventController.searchEvent(req, res);

			// assert
			expect(eventService.searchEventService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(400);
		});

		it("should return 200 Response when searchEvent is successfull", async () => {
			// arrange
			const events = [{ id: 1 }];
			eventService.searchEventService.mockReturnValueOnce(events);

			const res = {};

			const req = {
				query: {
					q: "search query",
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await eventController.searchEvent(req, res);

			// assert
			expect(eventService.searchEventService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining([{ id: 1 }])
			);
		});
	});
});
