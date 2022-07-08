import {
  getAllClasses,
  getBoats,
  getBoatById,
  postBoat,
  updateBoat,
  deleteBoat,
} from "../boat";
import { when } from "jest-when";
import { BoatService } from "../../services/boat";
import { mockRequest, mockResponse } from "../../test-util";

jest.mock("../../services/boat");

describe("Boat Controller", () => {
  describe("getAllClasses", () => {
    it("should return 200 and array of boat classes", async () => {
      const req = mockRequest({});

      const res = mockResponse();

      const mockReturnValue = [
        {
          id: 1,
          name: "IRC",
        },
        {
          id: 2,
          name: "NHC1",
        },
        {
          id: 3,
          name: "NHC2",
        },
        {
          id: 4,
          name: "Firefly",
        },
      ];

      when(BoatService.getAllClasses)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getAllClasses(req, res);

      expect(BoatService.getAllClasses).toHaveBeenCalledTimes(1);
      expect(BoatService.getAllClasses).toHaveBeenLastCalledWith();
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });
  describe("getAllBoats", () => {
    it("should return 200 and array of boats", async () => {
      const req = mockRequest({});

      const res = mockResponse();

      const mockReturnValue = [
        {
          id: 1,
          name: "Lizante",
          sailno: "GBR 1967",
          classid: 1,
          clubid: 2,
        },
        {
          id: 2,
          name: "Ker 40",
          sailno: "GBR 1872",
          classid: 2,
          clubid: 1,
        },
        {
          id: 3,
          name: "Firefly 1",
          sailno: "GBR 1292",
          classid: 4,
          clubid: 1,
        },
        {
          id: 4,
          name: "Firefly 2",
          sailno: "GBR 2131",
          classid: 4,
          clubid: 2,
        },
      ];

      when(BoatService.getBoats)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getBoats(req, res);

      expect(BoatService.getBoats).toHaveBeenCalledTimes(1);
      expect(BoatService.getBoats).toHaveBeenLastCalledWith();
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
    describe("getBoatById", () => {
      it("should return 200 a single boat", async () => {
        const boatId = 1;
        const params = { id: 1 };

        const req = mockRequest({
          params,
        });

        const res = mockResponse();

        const mockReturnValue = [
          {
            id: 1,
            name: "Lizante",
            sailno: "GBR 1967",
            classid: 1,
            clubid: 2,
          },
        ];

        when(BoatService.getBoatsById)
          .calledWith(boatId)
          .mockReturnValueOnce(Promise.resolve(mockReturnValue));

        await getBoatById(req, res);

        expect(BoatService.getBoatsById).toHaveBeenCalledTimes(1);
        expect(BoatService.getBoatsById).toHaveBeenLastCalledWith(boatId);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(mockReturnValue);
      });
    });
    describe("post boat", () => {
      it("should return 200 when boat is successfully created", async () => {
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

        when(BoatService.saveBoat).calledWith(body);

        await postBoat(req, res);

        expect(BoatService.saveBoat).toHaveBeenCalledTimes(1);
        expect(BoatService.saveBoat).toHaveBeenLastCalledWith(body);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(204);
      });
    });
    describe("updateBoat", () => {
      it("should return 200 when updating exisitng boat", async () => {
        const id = 1;
        const body = {
          typeId: 1,
          classId: 3,
          clubId: 3,
          name: "QUB Firefly 7",
          sailNo: "GBR 1676",
          teamId: 3,
        };

        const mockReturnValue = {
          id: 1,
          name: "QUB Firefly 7",
          sailno: "GBR 1676",
          classid: 3,
          clubid: 3,
        };

        const req = mockRequest({
          params: { id },
          body,
        });

        const res = mockResponse();

        when(BoatService.updateBoat)
          .calledWith(body, id)
          .mockReturnValueOnce(Promise.resolve(mockReturnValue));

        await updateBoat(req, res);

        expect(BoatService.updateBoat).toHaveBeenCalledTimes(1);
        expect(BoatService.updateBoat).toHaveBeenLastCalledWith(body, id);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(mockReturnValue);
      });
    });
    describe("deleteBoat", () => {
      it("should return 200 when deleting", async () => {
        const id = 1;

        const req = mockRequest({
          params: { id },
        });

        const res = mockResponse();

        when(BoatService.removeBoat).calledWith(id);

        await deleteBoat(req, res);

        expect(BoatService.removeBoat).toHaveBeenCalledTimes(1);
        expect(BoatService.removeBoat).toHaveBeenLastCalledWith(id);
        expect(res.sendStatus).toHaveBeenCalledTimes(1);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
      });
    });
  });
});
