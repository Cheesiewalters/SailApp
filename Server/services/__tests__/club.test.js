const prisma = require("../../utils/prisma");
const clubService = require("../club");

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("clubService", () => {
	describe("getClubs", () => {
		it("should return all clubs", async () => {
			// arrange
			const club = { id: 1 };

			prisma.clubs = { findMany: jest.fn().mockReturnValueOnce(club) };

			//act
			const result = await clubService.getClubs();

			// assert
			expect(prisma.clubs.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(club);
		});
		it("should return club by id", async () => {
			// arrange
			const id = 1;
			const club = { id: 1 };

			prisma.clubs = { findUnique: jest.fn().mockReturnValueOnce(club) };

			//act
			const result = await clubService.getClubById(id);

			// assert
			expect(prisma.clubs.findUnique).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: id,
					},
				})
			);
			expect(prisma.clubs.findUnique).toHaveBeenCalledTimes(1);
			expect(result).toBe(club);
		});
		it("should save a club and return the new club", async () => {
			// arrange

			const name = "name";
			const req = {
				body: { name: name },
			};

			const newClub = {
				name: name,
			};

			prisma.clubs = { create: jest.fn().mockReturnValueOnce(newClub) };

			//act
			const result = await clubService.createClub(req);

			// assert
			// assert
			expect(prisma.clubs.create).toHaveBeenCalledWith(
				expect.objectContaining({
					data: {
						name: name,
					},
				})
			);
			expect(prisma.clubs.create).toHaveBeenCalledTimes(1);
			expect(result).toBe(newClub);
		});
		it("should update a club and return the updatedClub", async () => {
			// arrange
			const id = 1;
			const name = "name";
			const req = {
				params: { id: id },
				body: { name: name },
			};

			const newClub = {
				name: name,
			};

			prisma.clubs = { update: jest.fn().mockReturnValueOnce(newClub) };

			//act
			const result = await clubService.updateClub(req);

			// assert
			expect(prisma.clubs.update).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: id,
					},
					data: {
						name: name,
					},
				})
			);
			expect(prisma.clubs.update).toHaveBeenCalledTimes(1);
			expect(result).toBe(newClub);
		});
		
	});
});
