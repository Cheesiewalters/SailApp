const boatController = require("../controllers/boat");
const boatService = require("../services/boat");

jest.mock("../services/boat");

describe("boat controller", () => {
	describe("getAllBoats", () => {
		it("should return 204 Response when no classes are available", async () => {
			// arrange
			boatService.getAllBoatClassesService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await boatController.getAllClasses(undefined, res);

			// assert
			expect(boatService.getAllBoatClassesService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when classes available", async () => {
			// arrange
			const classes = [{ id: 1 }];
			boatService.getAllBoatClassesService.mockReturnValueOnce(classes);

			const res = {};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await boatController.getAllClasses(undefined, res);

			// assert
			expect(boatService.getAllBoatClassesService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ classes })
			);
		});

		it("should return 204 Response when no boats are available", async () => {
			// arrange
			boatService.getAllBoatsService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await boatController.getAllBoats(undefined, res);

			// assert
			expect(boatService.getAllBoatsService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when boats available", async () => {
			// arrange
			const boats = [{ id: 1 }];
			boatService.getAllBoatsService.mockReturnValueOnce(boats);

			const res = {};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await boatController.getAllBoats(undefined, res);

			// assert
			expect(boatService.getAllBoatsService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ boats }));
		});

		it("should return 204 Response when no boats by id are available", async () => {
			// arrange
			boatService.getBoatsByIdService.mockReturnValueOnce([]);

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
			await boatController.getBoatByID(req, res);

			// assert
			expect(boatService.getBoatsByIdService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 200 Response when boats by id is available", async () => {
			// arrange
			const boat = [{ id: 1 }];
			boatService.getBoatsByIdService.mockReturnValueOnce(boat);

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
			await boatController.getBoatByID(req, res);

			// assert
			expect(boatService.getBoatsByIdService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ boat }));
		});

		it("should return 500 Response when post boats fails", async () => {
			// arrange
			boatService.postBoatService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await boatController.postBoat(undefined, res);

			// assert
			expect(boatService.postBoatService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(500);
		});

		it("should return 200 Response when a boat is successfully posted", async () => {
			// arrange
			const newBoat = [{ id: 1 }];
			boatService.postBoatService.mockReturnValueOnce(newBoat);

			const res = {};
			const id = 1;
			const sailno = 1234;
			const name = "new boat";
			const req = {
				body: {
					name: name,
					classid: id,
					clubid: id,
					sailno: sailno,
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await boatController.postBoat(req, res);

			// assert
			expect(boatService.postBoatService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ newBoat })
			);
		});

		it("should return 400 Response when updating a boat fails", async () => {
			// arrange
			boatService.updateBoatService.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};

			// act
			await boatController.updateBoat(undefined, res);

			// assert
			expect(boatService.updateBoatService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(400);
		});

		it("should return 200 Response when a boat is successfully updated", async () => {
			// arrange
			const updatedBoat = [{ id: 1 }];
			boatService.updateBoatService.mockReturnValueOnce(updatedBoat);

			const res = {};
			const id = 1;
			const sailno = 1234;
			const name = "new boat";
			const req = {
				body: {
					name: name,
					classid: id,
					clubid: id,
					sailno: sailno,
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await boatController.updateBoat(req, res);

			// assert
			expect(boatService.updateBoatService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ updatedBoat })
			);
		});

		it("should return 500 Response when deleting a boat fails", async () => {
			// arrange
			boatService.deleteBoatService.mockReturnValueOnce([]);

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
			await boatController.deleteBoat(req, res);

			// assert
			expect(boatService.deleteBoatService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(500);
		});

		it("should return 200 Response when a boat is successfully deleted", async () => {
			// arrange
			const deletedBoat = [{ message: `Successfully deleted boat with id: 1` }];
			boatService.deleteBoatService.mockReturnValueOnce(deletedBoat);

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
			await boatController.deleteBoat(req, res);

			// assert
			expect(boatService.deleteBoatService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({
					message: `Successfully deleted boat with id: 1`,
				})
			);
		});
	});
});
