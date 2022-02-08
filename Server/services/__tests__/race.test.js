const prisma = require("../../utils/prisma");
const raceService = require("../race");

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("boatService", () => {
	describe("getRaces", () => {
		it("should return all races", async () => {
			// arrange
			const race = { id: 1 };

			prisma.races = { findMany: jest.fn().mockReturnValueOnce(race) };

			//act
			const result = await raceService.getRaces();

			// assert
			expect(prisma.races.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(race);
		});
    })

    describe("getRaceID", () => {
		it("should return all races by id", async () => {
			// arrange
			const id = 1;
			const race = { id: 1 };

			prisma.races = { findMany: jest.fn().mockReturnValueOnce(race) };

			//act
			const result = await raceService.getRaceID(id);

			// assert
			expect(prisma.races.findMany).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: id,
					},
				})
			);
			expect(prisma.races.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(race);
		});
    })
    describe("getRaceBoat", () => {
		it("should return all raceboats", async () => {
			// arrange
			const raceid = 1;
			const race = { id: 1 };

			prisma.raceboats = { findMany: jest.fn().mockReturnValueOnce(race) };

			//act
			const result = await raceService.getRaceBoat(raceid);

			// assert
			expect(prisma.raceboats.findMany).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						raceid: raceid
					},
				})
			);
			expect(prisma.raceboats.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(race);
		});
    })
    describe("createRace", () => {
		it("should return a created race", async () => {
			// arrange
			const raceid = 1;
			const req = { 
                body: {
                eventId: 1,
                classId: 1,
                startTime: "2021-12-02 09:15:15"
            } };
            const race = {id: 1}

			prisma.races = { create: jest.fn().mockReturnValueOnce(race) };

			//act
			const result = await raceService.createRace(req);
			
			// assert
			expect(prisma.races.create).toHaveBeenCalledWith(
				expect.objectContaining(
					{data: {classid: 1, eventid: 1, starttime: "2021-12-02 09:15:15"}}
				)
			);
			expect(prisma.races.create).toHaveBeenCalledTimes(1);
			expect(result).toBe(race);
		});
    })
    describe("updateRaces", () => {
		it("should update a race", async () => {
			// arrange
			const raceid = 1;
			const req = { 
                params: {
                    id: 1
                },
                body: {
                eventId: 1,
                classId: 1,
                startTime: "2021-12-02 09:15:15"
            } };
            const race = {id: 1}

			prisma.races = { update: jest.fn().mockReturnValueOnce(race) };

			//act
			const result = await raceService.updateRaces(req);
			
			// assert
			expect(prisma.races.update).toHaveBeenCalledWith(
				expect.objectContaining(
					{data: {classid: 1, eventid: 1, starttime: "2021-12-02T09:15:15.000Z"}, where: {id: 1}}
				)
			);
			expect(prisma.races.update).toHaveBeenCalledTimes(1);
			expect(result).toBe(race);
		});
    })
    describe("deleteRace", () => {
        it("should remove a race", async () => {
            // arrange
            const id = 1;
            const req = { 
                params: {
                    id: 1
                }
             };

            prisma.raceboats = { deleteMany: jest.fn().mockReturnValueOnce() };
            prisma.races = { delete: jest.fn().mockReturnValueOnce() };

            //act
            await raceService.removeRace(req);

            // assert
            expect(prisma.raceboats.deleteMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: {
                        raceid: parseInt(id),
                    },
                })
            );
            expect(prisma.raceboats.deleteMany).toHaveBeenCalledTimes(1);
            expect(prisma.races.delete).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: {
                        id: parseInt(id),
                    },
                })
            );
            expect(prisma.raceboats.deleteMany).toHaveBeenCalledTimes(1);
            expect(prisma.races.delete).toHaveBeenCalledTimes(1);
        });
    })
    describe("createRaceBoat", () => {
        it("should create a raceboat", async () => {
            // arrange
            const raceid = 1;
            const boatid = 1;
            const position = 1;
            const req = { 
                params: {
                    id: 1
                },
                body: {
				    boatId: 1,
				    startTime: "2021-12-02T09:15:15.000Z",
				    finishTime: "2021-12-02T09:20:15.000Z",
				    position: 1,
                }
             };

            prisma.raceboats = { create: jest.fn().mockReturnValueOnce() };

            //act
            await raceService.createRaceBoat(req);

            // assert
            expect(prisma.raceboats.create).toHaveBeenCalledWith(
                expect.objectContaining({data: {
                    raceid: 1,
				    boatid: 1,
				    starttime: "2021-12-02T09:15:15.000Z",
				    finishtime: "2021-12-02T09:20:15.000Z",
				    position: 1
                }
                })
            );
            expect(prisma.raceboats.create).toHaveBeenCalledTimes(1);
        });
    })
    describe("deleteRaceBoatsByID", () => {
        it("should delete a raceboat", async () => {
            // arrange
            const req = { 
                params: {
                    id2: 1
                }
                
             };

            prisma.raceboats = { deleteMany: jest.fn().mockReturnValueOnce() };

            //act
            await raceService.deleteRaceBoatsByID(req);

            // assert
            expect(prisma.raceboats.deleteMany).toHaveBeenCalledWith(
                expect.objectContaining({
                })
            );
            expect(prisma.raceboats.deleteMany).toHaveBeenCalledTimes(1);
        });
    })
    describe("it should update a raceboat", () => {
        it("should update a raceboat and return the updatedBoat", async () => {
			// arrange
			const id = 1;
			const req = {
				params: { id: id },
				body: { boatId: 1,
				    startTime: "2021-12-02T09:15:15.000Z",
				    finishTime: "2021-12-02T09:20:15.000Z",
				    position: 1 },
			};

			const updatedRace = {
                    raceid:1,
                    boatid: 1,
				    starttime: "2021-12-02T09:15:15.000Z",
				    finishtime: "2021-12-02T09:20:15.000Z",
				    position: 1
			};

			prisma.raceboats = { updateMany: jest.fn().mockReturnValueOnce(updatedRace) };

			//act
			const result = await raceService.updateRaceBoat(req);

			// assert
			expect(prisma.raceboats.updateMany).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						raceid: id,
				        boatid: id,
					},
					data: {
						starttime: "2021-12-02T09:15:15.000Z",
                        finishtime: "2021-12-02T09:20:15.000Z",
                        position: 1
					},
				})
			);
			expect(prisma.raceboats.updateMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(updatedRace);
		});
    })
    describe("getRaceBoatByBoat", () => {
        it("should return a raceboat by boat id", async () => {
			// arrange
			const id = 1;
			const req = {
				params: { id: id, id2: id },
			
			};

			const raceboat = {
                    raceid:1,
                    boatid: 1,
				    starttime: "2021-12-02T09:15:15.000Z",
				    finishtime: "2021-12-02T09:20:15.000Z",
				    position: 1
			};

			prisma.raceboats = { findMany: jest.fn().mockReturnValueOnce(raceboat) };

			//act
			const result = await raceService.getRaceBoatByBoat(req);

			// assert
			expect(prisma.raceboats.findMany).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						raceid: id,
				        boatid: id,
					},
				})
			);
			expect(prisma.raceboats.findMany).toHaveBeenCalledTimes(1);
			expect(result).toBe(raceboat);
		});
    })
})