const prisma = require("../../utils/prisma");
const boatService = require("../boat");

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("boatService", () => {
	describe("getBoats", () => {
		it("should return all boats", async () => {
			// arrange
			const boat = { id: 1 };

			prisma.boats = { findMany: jest.fn().mockReturnValueOnce(boat) };

			//act
			const result = await boatService.getBoats();

			// assert
			expect(prisma.boats.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(boat);
		});

		it("should return all boats classes", async () => {
			// arrange
			const classes = { id: 1 };

			prisma.renamedclass = {
				findMany: jest.fn().mockReturnValueOnce(classes),
			};

			//act
			const result = await boatService.getAllBoatClassesService();

			// assert
			expect(prisma.renamedclass.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(classes);
		});

		it("should return boat by id result", async () => {
			// arrange
			const id = 1;
			const boat = { id: 1 };

			prisma.boats = { findMany: jest.fn().mockReturnValueOnce(boat) };

			//act
			const result = await boatService.getBoatsById(id);

			// assert
			// assert
			expect(prisma.boats.findMany).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: id,
					},
				})
			);
			expect(prisma.boats.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(boat);
		});
		it("should save a new boat and return the new boat", async () => {
			// arrange
			const id = 1;
			const classid = 1;
			const clubid = 1;
			const name = "name";
			const sailno = 1234;

			const req = {
				body: { classId: classid, clubId: clubid, name: name, sailNo: sailno },
			};

			const newBoat = {
				classId: classid,
				clubId: clubid,
				sailNo: sailno,
				name: name,
			};

			prisma.boats = { create: jest.fn().mockReturnValueOnce(newBoat) };

			//act
			const result = await boatService.saveBoat(req);

			// assert
			// assert
			expect(prisma.boats.create).toHaveBeenCalledWith(
				expect.objectContaining({
					data: {
						classid: classid,
						clubid: clubid,
						name: name,
						sailno: sailno,
					},
				})
			);
			expect(prisma.boats.create).toHaveBeenCalledTimes(1);
			expect(result).toBe(newBoat);
		});
		it("should update a boat and return the updatedBoat", async () => {
			// arrange
			const id = 1;
			const classid = 1;
			const clubid = 1;
			const name = "name";
			const sailno = 1234;

			const req = {
				params: { id: id },
				body: { classId: classid, clubId: clubid, name: name, sailNo: sailno },
			};

			const newBoat = {
				classId: classid,
				clubId: clubid,
				sailNo: sailno,
				name: name,
			};

			prisma.boats = { update: jest.fn().mockReturnValueOnce(newBoat) };

			//act
			const result = await boatService.updateBoat(req);

			// assert
			expect(prisma.boats.update).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: id,
					},
					data: {
						classid: classid,
						clubid: clubid,
						name: name,
						sailno: sailno,
					},
				})
			);
			expect(prisma.boats.update).toHaveBeenCalledTimes(1);
			expect(result).toBe(newBoat);
		});
		it("should remove a boat", async () => {
			// arrange
			const id = 1;

			prisma.raceboats = { deleteMany: jest.fn().mockReturnValueOnce() };
			prisma.boats = { delete: jest.fn().mockReturnValueOnce() };

			//act
			await boatService.removeBoat(id);

			// assert
			expect(prisma.raceboats.deleteMany).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						boatid: parseInt(id),
					},
				})
			);
			expect(prisma.raceboats.deleteMany).toHaveBeenCalledTimes(1);
			expect(prisma.boats.delete).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: parseInt(id),
					},
				})
			);
			expect(prisma.boats.delete).toHaveBeenCalledTimes(1);
		});
	});
});
