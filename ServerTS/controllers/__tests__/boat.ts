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
      const query = {};

      const req = mockRequest({
        query,
      });

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
      const query = {};

      const req = mockRequest({
        query,
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
  });
});
