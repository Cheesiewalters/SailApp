const clubController = require("../../controllers/club");
const clubService = require("../../services/club");

jest.mock("../../services/club");

describe("Club controller", () => {
	describe("getAllClubs", () => {
		it("should return 204 Response when no clubs are available", async () => {
			// arrange
			clubService.getClubs.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await clubController.getAllClubs(undefined, res);

			// assert
			expect(clubService.getClubs).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when clubs available", async () => {
			// arrange
			const clubs = [{ id: 1 }];
			clubService.getClubs.mockReturnValueOnce(clubs);

			const res = {};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await clubController.getAllClubs(undefined, res);

			// assert
			expect(clubService.getClubs).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining([{ id: 1 }])
			);
		});
	});
	describe("getClubsById", () => {
		it("should return 204 Response when no clubs by id are available", async () => {
			// arrange
			clubService.getClubById.mockReturnValueOnce([]);

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
			await clubController.getClubByIDController(req, res);

			// assert
			expect(clubService.getClubById).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when clubs by id available", async () => {
			// arrange
			const club = [{ id: 1 }];
			clubService.getClubById.mockReturnValueOnce(club);

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
			await clubController.getClubByIDController(req, res);

			// assert
			expect(clubService.getClubById).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining([{ id: 1 }])
			);
		});
	});
	describe("postClub", () => {
		it("should return 500 Response when post club is unsuccessfull", async () => {
			// arrange
			clubService.createClub.mockReturnValueOnce([]);

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
			await clubController.postClub(req, res);

			// assert
			expect(clubService.createClub).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(500);
		});

		it("should return 200 Response when post club is successfull", async () => {
			// arrange
			const newClub = [{ id: 1 }];
			clubService.createClub.mockReturnValueOnce(newClub);

			const res = {};
			const name = "new club";
			const req = {
				body: {
					name: name,
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await clubController.postClub(req, res);

			// assert
			expect(clubService.createClub).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ newClub })
			);
		});
	});
	describe("deleteClub", () => {
		it("should return 500 Response when update club is unsuccessfull", async () => {
			// arrange
			clubService.deleteClub.mockReturnValueOnce([]);

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
			await clubController.deleteClubController(req, res);

			// assert
			expect(clubService.deleteClub).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(500);
		});

		it("should return 200 Response when delete club is successfull", async () => {
			// arrange
			const deletedClub = [{ message: `Successfully deleted club with id: 1` }];
			clubService.deleteClub.mockReturnValueOnce(deletedClub);

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
			await clubController.deleteClubController(req, res);

			// assert
			expect(clubService.deleteClub).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({
					message: `Successfully deleted club with id: 1`,
				})
			);
		});
	});
	describe("updateClub", () => {
		it("should return 400 Response when update club is unsuccessfull", async () => {
			// arrange
			clubService.updateClub.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await clubController.updateClubController(undefined, res);

			// assert
			expect(clubService.updateClub).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(400);
		});

		it("should return 200 Response when update club is successfull", async () => {
			// arrange
			const updatedClub = [{ id: 1 }];
			clubService.updateClub.mockReturnValueOnce(updatedClub);

			const res = {};
			const name = "new club";
			const req = {
				body: {
					name: name,
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await clubController.updateClubController(req, res);

			// assert
			expect(clubService.updateClub).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ updatedClub })
			);
		});
	});
});
