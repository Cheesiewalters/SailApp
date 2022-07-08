import {
  getAllClubs,
  postClub,
  updateClubController,
  getClubByIDController,
} from "../club";
import { when } from "jest-when";
import { ClubService } from "../../services/club";
import { mockRequest, mockResponse } from "../../test-util";

jest.mock("../../services/club");

describe("Club Controller", () => {
  describe("get all clubs", () => {
    it("should return 200 and array of clubs", async () => {
      const req = mockRequest({});

      const res = mockResponse();

      const mockReturnValue = [
        {
          id: 1,
          name: "East Down Yacht Club",
        },
        {
          id: 2,
          name: "Ballyholme YC",
        },
        {
          id: 3,
          name: "East Antrim Boat Club",
        },
        {
          id: 4,
          name: "Killyleagh YC",
        },
      ];

      when(ClubService.getClubs)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getAllClubs(req, res);

      expect(ClubService.getClubs).toHaveBeenCalledTimes(1);
      expect(ClubService.getClubs).toHaveBeenLastCalledWith();
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });
  describe("post club", () => {
    it("should return 200 when club is successfully created", async () => {
      const body = {
        name: "Larne Yacht Club",
      };

      const req = mockRequest({
        body,
      });

      const res = mockResponse();

      when(ClubService.createClub).calledWith(body);

      await postClub(req, res);

      expect(ClubService.createClub).toHaveBeenCalledTimes(1);
      expect(ClubService.createClub).toHaveBeenLastCalledWith(body);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("updateClub", () => {
    it("should return 200 when updating exisitng club", async () => {
      const id = 1;
      const body = {
        name: "Sailing yacht club",
      };

      const req = mockRequest({
        params: { id },
        body,
      });

      const res = mockResponse();

      when(ClubService.updateClub).calledWith(body, id);
      await updateClubController(req, res);

      expect(ClubService.updateClub).toHaveBeenCalledTimes(1);
      expect(ClubService.updateClub).toHaveBeenLastCalledWith(body, id);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
  describe("getClubByID", () => {
    it("should return 200 and a single club", async () => {
      const clubId = 1;
      const params = { id: 1 };

      const req = mockRequest({
        params,
      });

      const res = mockResponse();

      const mockReturnValue = {
        id: 1,
        name: "Sailing yacht club",
      };
      when(ClubService.getClubById)
        .calledWith(clubId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getClubByIDController(req, res);

      expect(ClubService.getClubById).toHaveBeenCalledTimes(1);
      expect(ClubService.getClubById).toHaveBeenLastCalledWith(clubId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });
});
