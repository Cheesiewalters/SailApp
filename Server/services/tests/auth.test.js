const bcrypt = require("bcryptjs");
const jwtMiddleware = require("../../middleware/jwt");
const prisma = require("../../utils/prisma");
const { when } = require("jest-when");
const userService = require("../user");
const authService = require("../auth");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

jest.mock("bcryptjs");
jest.mock("@prisma/client");
jest.mock("../../utils/prisma");
jest.mock("jsonwebtoken");
jest.mock("../user");
jest.mock("../../middleware/jwt");

describe("authService", () => {
	describe("login", () => {
		it("should return access and refresh tokens", async () => {
			// arrange
			const id = 1;
			const roleid = 1;
			const email = "M@qub.ac.uk";
			const password = "123123";
			const access = "access_token";
			const refresh = "refresh_token";

			when(userService.getUserByEmail)
				.calledWith(email)
				.mockReturnValueOnce({ id, email, password, roleid });

			when(bcrypt.compareSync)
				.calledWith(password, password)
				.mockReturnValueOnce(true);

			when(jwtMiddleware.signAccessToken)
				.calledWith({ userid: id, userRole: roleid })
				.mockReturnValueOnce(access);

			when(jwtMiddleware.signRefreshToken)
				.calledWith({ userid: id, userRole: roleid })
				.mockReturnValueOnce(refresh);

			//act
			const result = await authService.login({
				email: email,
				password: password,
			});

			// assert

			expect(jwtMiddleware.signRefreshToken).toHaveBeenCalledTimes(1);
			expect(jwtMiddleware.signAccessToken).toHaveBeenCalledTimes(1);
			expect(jwtMiddleware.signAccessToken).toHaveBeenCalledWith(
				expect.objectContaining({ userid: id, userRole: roleid })
			);
			expect(jwtMiddleware.signRefreshToken).toHaveBeenCalledWith(
				expect.objectContaining({ userid: id, userRole: roleid })
			);
			expect(bcrypt.compareSync).toHaveBeenCalledTimes(1);
			expect(bcrypt.compareSync).toHaveBeenCalledWith(password, password);

			expect(result.accessToken).toBe(access);
			expect(result.refreshToken).toBe(refresh);
		});
	});
	describe("refresh token", () => {
		it("should return a refresh token", async () => {
			// arrange
			const access = "access_token";
			const refresh = "refresh_token";
			const id = 1;
			const roleid = 1;
			const user = {
				id: id,
				userid: id,
				roleid: roleid,
			};

			prisma.user = { findUnique: jest.fn().mockReturnValueOnce(user) };

			when(jwtMiddleware.verifyRefreshToken)
				.calledWith(refresh)
				.mockReturnValueOnce({
					payload: {
						userid: id,
						roleid: roleid,
					},
				});

			when(jwtMiddleware.signAccessToken)
				.calledWith({ userid: id, userRole: roleid })
				.mockReturnValueOnce(access);

			//act
			const result = await authService.refreshToken({
				refreshToken: refresh,
			});

			// assert
			expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.user.findUnique).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						id: id,
					},
				})
			);
			expect(jwtMiddleware.verifyRefreshToken).toHaveBeenCalledTimes(1);
			expect(jwtMiddleware.verifyRefreshToken).toHaveBeenCalledWith(
				expect.stringContaining(refresh)
			);
			expect(jwtMiddleware.signAccessToken).toHaveBeenCalledTimes(1);
			expect(jwtMiddleware.signAccessToken).toHaveBeenCalledWith(
				expect.objectContaining({ userid: id, userRole: roleid })
			);

			expect(result).toStrictEqual(access);
		});
	});
});
