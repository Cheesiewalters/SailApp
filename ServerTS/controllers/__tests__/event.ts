import {
  getAllEvents,
  getEventTypes,
  searchEventController,
  getEventById,
  postEvent,
  deleteEventController,
  updateEvent,
} from "../event";
import { when } from "jest-when";
import { mockRequest, mockResponse } from "../../test-util";
import { EventService } from "../../services";

jest.mock("../../services/event");

describe("Event Controller", () => {
  describe("get all events", () => {
    it("should return 200 and array of events", async () => {
      const req = mockRequest({});
      const date = new Date();

      const res = mockResponse();

      const mockReturnValue = [
        {
          id: 2,
          eventtypeid: 2,
          starttime: date,
          enddate: date,
          name: "EDYC Wednesday night club racing",
          clubid: 2,
          description:
            "Normal wednesday night fleet raing for all classes participating",
          races: [
            {
              id: 4,
              starttime: date,
              class: {
                id: 2,
                name: "NHC1",
              },
            },
          ],
        },
      ];

      when(EventService.getAllEventsService)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getAllEvents(req, res);

      expect(EventService.getAllEventsService).toHaveBeenCalledTimes(1);
      expect(EventService.getAllEventsService).toHaveBeenLastCalledWith();
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });
  describe("get event types", () => {
    it("should return 200 and array of event types", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      const mockReturnValue = [
        {
          id: 1,
          name: "Team racing",
        },
        {
          id: 2,
          name: "Fleet Race",
        },
      ];

      when(EventService.getAllEventTypes)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getEventTypes(req, res);

      expect(EventService.getAllEventTypes).toHaveBeenCalledTimes(1);
      expect(EventService.getAllEventTypes).toHaveBeenLastCalledWith();
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });
  describe("search event controller", () => {
    it("should return 200 and an event that matches the search", async () => {
      const query = { q: "EDYC" };
      const date = new Date();

      const req = mockRequest({ query });

      const res = mockResponse();

      const mockReturnValue = [
        {
          id: 2,
          eventtypeid: 2,
          starttime: date,
          enddate: date,
          name: "EDYC Wednesday night club racing",
          clubid: 2,
          description:
            "Normal wednesday night fleet raing for all classes participating",
        },
      ];

      when(EventService.searchEvent)
        .calledWith(query.q)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await searchEventController(req, res);

      expect(EventService.searchEvent).toHaveBeenCalledTimes(1);
      expect(EventService.searchEvent).toHaveBeenLastCalledWith(query.q);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });
  describe("search event controller", () => {
    it("should return 200 and an event that matches the search", async () => {
      const eventId = 1;
      const date = new Date();
      const params = { id: 1 };

      const req = mockRequest({ params });

      const res = mockResponse();

      const mockReturnValue = [
        {
          id: 2,
          eventtypeid: 2,
          starttime: date,
          enddate: date,
          name: "EDYC Wednesday night club racing",
          clubid: 2,
          description:
            "Normal wednesday night fleet raing for all classes participating",
        },
      ];

      when(EventService.getEventByID)
        .calledWith(eventId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getEventById(req, res);

      expect(EventService.getEventByID).toHaveBeenCalledTimes(1);
      expect(EventService.getEventByID).toHaveBeenLastCalledWith(eventId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });
  describe("post event", () => {
    it("should return 200 when event is successfully created", async () => {
      const body = {
        eventTypeId: 2,
        startTime: "2021-04-26 16:00:00",
        endDate: "2021-06-26 17:45:00",
        name: "This is an event name",
        clubId: 4,
        description: "This is a description",
      };

      const req = mockRequest({
        body,
      });

      const res = mockResponse();

      when(EventService.postEventService).calledWith(body);

      await postEvent(req, res);

      expect(EventService.postEventService).toHaveBeenCalledTimes(1);
      expect(EventService.postEventService).toHaveBeenLastCalledWith(body);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("deleteEvent", () => {
    it("should return 200 when deleting an event", async () => {
      const id = 1;

      const req = mockRequest({
        params: { id },
      });

      const res = mockResponse();

      when(EventService.deleteEvent).calledWith(id);

      await deleteEventController(req, res);

      expect(EventService.deleteEvent).toHaveBeenCalledTimes(1);
      expect(EventService.deleteEvent).toHaveBeenLastCalledWith(id);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: `Successfully deleted event with id: ${id}`,
      });
    });
  });
  describe("updateEvent", () => {
    it("should return 200 when updating exisitng event", async () => {
      const id = 1;
      const date = new Date();

      const body = {
        eventTypeId: 2,
        startTime: "2021-12-03 16:00:00",
        endDate: "2021-12-03 17:45:00",
        name: "This is an event name",
        clubId: 3,
        description: "This is a description",
      };

      const resRepsonse = {
        id: 2,
        eventtypeid: 2,
        starttime: date,
        enddate: date,
        name: "This is an event name",
        clubid: 3,
        description: "This is a description",
      };

      const req = mockRequest({
        params: { id },
        body,
      });

      const res = mockResponse();

      when(EventService.updateEventService)
        .calledWith(body, id)
        .mockReturnValueOnce(Promise.resolve(resRepsonse));
      await updateEvent(req, res);

      expect(EventService.updateEventService).toHaveBeenCalledTimes(1);
      expect(EventService.updateEventService).toHaveBeenLastCalledWith(
        body,
        id
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(resRepsonse);
    });
  });
});
