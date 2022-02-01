const raceController = require("../controllers/race");
const raceService = require("../services/race");

jest.mock("../services/race");

describe("Race controller", () => {
	describe("getAllRaces", () => {
		it("should return 204 Response when no race are available", async () => {
			// arrange
			raceService.getAllRacesService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await raceController.getAllRaces(undefined, res);

			// assert
			expect(raceService.getAllRacesService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when races available", async () => {
			// arrange
			const race = [{ id: 1 }];
			raceService.getAllRacesService.mockReturnValueOnce(race);

			const res = {};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await raceController.getAllRaces(undefined, res);

			// assert
			expect(raceService.getAllRacesService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ race: [{ id: 1 }] })
			);
		});
	});
	describe("getRaceByID", () => {
		it("should return 204 Response when getRaceByID is unsuccessfull", async () => {
			// arrange
			raceService.getRaceByIdService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};
			const id = 1;

			const req = {
				params: {
					id: id,
				},
			};
			// act
			await raceController.getRaceByID(req, res);

			// assert
			expect(raceService.getRaceByIdService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when getRaceByID is successfull", async () => {
			// arrange
			const eventTypes = [{ id: 1 }];
			raceService.getRaceByIdService.mockReturnValueOnce(eventTypes);

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
			await raceController.getRaceByID(req, res);

			// assert
			expect(raceService.getRaceByIdService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ race: [{ id: 1 }] })
			);
		});
	});
	describe("postRace", () => {
		it("should return 400 Response when postRace is unsuccessfull", async () => {
			// arrange
			raceService.postRaceService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await raceController.postRace(undefined, res);

			// assert
			expect(raceService.postRaceService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(400);
		});

		it("should return 200 Response when postRace is successfull", async () => {
			// arrange
			const newRace = [{ id: 1 }];
			raceService.postRaceService.mockReturnValueOnce(newRace);

			const res = {};
			const id = 1;
			const req = {
				body: {
					eventid: id,
					classid: id,
					starttime: "2021-11-13T12:00:00.000Z",
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await raceController.postRace(req, res);

			// assert
			expect(raceService.postRaceService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ newRace: [{ id: 1 }] })
			);
		});
	});
	describe("updateRace", () => {
		it("should return 400 Response updateRace is unsuccessfull", async () => {
			// arrange
			raceService.updateRaceService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await raceController.updateRace(undefined, res);

			// assert
			expect(raceService.updateRaceService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(400);
		});

		it("should return 200 Response when updateRace is successfull", async () => {
			// arrange
			const newRace = [{ id: 1 }];
			raceService.updateRaceService.mockReturnValueOnce(newRace);

			const res = {};
			const id = 1;
			const name = "new event";
			const req = {
				params: {
					id: 1,
				},
				body: {
					eventid: id,
					classid: id,
					starttime: "2021-11-13T12:00:00.000Z",
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await raceController.updateRace(req, res);

			// assert
			expect(raceService.updateRaceService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ updatedRace: [{ id: 1 }] })
			);
		});
	});
	describe("deleteRace", () => {
		it("should return 204 Response deleteRace throws an error", async () => {
			// arrange
			raceService.deleteRaceService.mockReturnValueOnce([]);

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
			await raceController.deleteRace(req, res);

			// assert
			expect(raceService.deleteRaceService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when deleteRace is successfull", async () => {
			// arrange
			const deletedRace = [
				{ message: `Successfully deleted event with id: 1` },
			];
			raceService.deleteRaceService.mockReturnValueOnce(deletedRace);

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
			await raceController.deleteRace(req, res);

			// assert
			expect(raceService.deleteRaceService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({
					message: "Successfully deleted race with id: 1",
				})
			);
		});
	});
	describe("deleteAllRaceBoatsById", () => {
		it("should return 204 Response deleteAllRaceBoatsById is unsucessfull", async () => {
			// arrange
			raceService.deleteRaceBoatsByIDService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};
			const id = 1;

			const req = {
				params: {
					id2: id,
				},
			};

			// act
			await raceController.deleteAllRaceBoatsById(undefined, res);

			// assert
			expect(raceService.deleteRaceBoatsByIDService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(400);
		});

		it("should return 200 Response when deleteAllRaceBoatsById is successfull", async () => {
			// arrange
			const deletedRaceBoatById = [{ id: 1 }];
			raceService.deleteRaceBoatsByIDService.mockReturnValueOnce(
				deletedRaceBoatById
			);

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
			await raceController.deleteAllRaceBoatsById(req, res);

			// assert
			expect(raceService.deleteRaceBoatsByIDService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({
					message: `Successfully deleted race boat with id: 1`,
				})
			);
		});
	});
	describe("updateRaceBoatByBoatId", () => {
		it("should return 400 Response updateRaceBoatByBoatId is unsuccessfull", async () => {
			// arrange
			raceService.updateRaceBoatService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await raceController.updateRaceBoatByBoatId(undefined, res);

			// assert
			expect(raceService.updateRaceBoatService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(400);
		});

		it("should return 200 Response when updateRaceBoatByBoatId is successfull", async () => {
			// arrange
			const events = [{ id: 1 }];
			raceService.updateRaceBoatService.mockReturnValueOnce(events);

			const res = {};

			const id = 1;

			const req = {
				params: {
					id: id,
				},
				body: {
					raceid: id,
					boatid: id,
					position: id,
					starttime: "2021-11-13T12:00:00.000Z",
					finishtime: "2021-11-13T12:45:00.000Z",
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await raceController.updateRaceBoatByBoatId(req, res);

			// assert
			expect(raceService.updateRaceBoatService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ message: "Succesfully updated raceBoat" })
			);
		});
	});
	describe("getRaceBoatByBoatId", () => {
		it("should return 400 Response getRaceBoatByBoatId is unsuccessfull", async () => {
			// arrange
			raceService.getRaceBoatByBoatIdService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await raceController.getRaceBoatByBoatId(undefined, res);

			// assert
			expect(raceService.getRaceBoatByBoatIdService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(500);
		});

		it("should return 200 Response when getRaceBoatByBoatId is successfull", async () => {
			// arrange
			const events = [{ id: 1 }];
			raceService.getRaceBoatByBoatIdService.mockReturnValueOnce(events);

			const res = {};

			const id = 1;

			const req = {
				params: {
					id: id,
				},
				body: {
					raceid: id,
					boatid: id,
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await raceController.getRaceBoatByBoatId(req, res);

			// assert
			expect(raceService.getRaceBoatByBoatIdService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(expect.objectContaining(events));
		});
	});
});
