import {
  getAllRaces,
  postRace,
  deleteRace,
  updateRace,
  getRaceByID,
  postRaceBoats,
  getAllRaceBoatsByID,
  deleteAllRaceBoatsById,
  updateRaceBoatByBoatId,
  getRaceBoatByBoatId,
} from "../race";
import { when } from "jest-when";
import { mockRequest, mockResponse } from "../../test-util";
import { RaceService } from "../../services";

describe("Race Controller", () => {
  describe("get all races", () => {
    it("should return 200 and array of races", async () => {
      const req = mockRequest({});
      const date = new Date();

      const res = mockResponse();

      const mockReturnValue = [
        {
          id: 1,
          eventid: 1,
          starttime: date,
          classid: 4,
        },
        {
          id: 2,
          eventid: 1,
          starttime: date,
          classid: 4,
        },
        {
          id: 3,
          eventid: 1,
          starttime: date,
          classid: 4,
        },
        {
          id: 4,
          eventid: 2,
          starttime: date,
          classid: 2,
        },
      ];

      when(RaceService.getRaces)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getAllRaces(req, res);

      expect(RaceService.getRaces).toHaveBeenCalledTimes(1);
      expect(RaceService.getRaces).toHaveBeenLastCalledWith();
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });
});
