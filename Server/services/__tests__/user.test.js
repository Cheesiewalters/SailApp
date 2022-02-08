const prisma = require("../../utils/prisma");
const userService = require("../user");
const { when } = require("jest-when");
const bcrypt = require("bcryptjs");

jest.mock("bcryptjs");
jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("userService", () => {
	describe("createUser", () => {
		it("should create a user", async () => {
			// arrange
			const data = { password: "1234", email: "email@qub.ac.uk", roleid: 1 };
			prisma.user = { create: jest.fn().mockReturnValueOnce() };
            const hashedPass = "hashed123"

            when(bcrypt.hashSync)
				.calledWith("1234", 8)
				.mockReturnValueOnce(hashedPass);


			//act
			await userService.createUser(data);

			// assert
            expect(bcrypt.hashSync).toHaveBeenCalledTimes(1);
			expect(bcrypt.hashSync).toHaveBeenCalledWith("1234", 8);
			expect(prisma.user.create).toHaveBeenCalledTimes(1);
		});
    })
    describe("deleteUserByEmail", () => {
		it("should create delete a user", async () => {
			// arrange
            const email = "email@qub.ac.uk";
			const user = { id: 1};

			prisma.user = { delete: jest.fn().mockReturnValueOnce(user) };

			//act
			await userService.deleteUserByEmail(email);

			// assert
           
			expect(prisma.user.delete).toHaveBeenCalledTimes(1);
		});
    })
    describe("getAllUsers", () => {
		it("should create get all users", async () => {
			// arrange
			const user = { id: 1};

			prisma.user = { findMany: jest.fn().mockReturnValueOnce(user) };

			//act
			const result = await userService.getAllUsers();

			// assert
           
			expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
            expect(result).toBe(user);
		});
    })
    describe("getUserByEmail", () => {
		it("should get a user by email", async () => {
			// arrange
            const id = 1;
            const email = "email@qub.ac.uk"
			const user = { id: id};
            

			prisma.user = { findUnique: jest.fn().mockReturnValueOnce(user) };

			//act
			const result = await userService.getUserByEmail(email);

			// assert
           
			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.user.findUnique).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						email: email,
					},
				})
			);
            expect(result).toBe(user);
		});
    })
    describe("getUserById", () => {
		it("should get a user by id", async () => {
			// arrange
            const id = 1;
            const email = "email@qub.ac.uk"
			const user = { id: id};
            

			prisma.user = { findUnique: jest.fn().mockReturnValueOnce(user) };

			//act
			const result = await userService.getUserById({id});

			// assert
           
			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.user.findUnique).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: id
					},
				})
			);
            expect(result).toBe(user);
		});
    })
})