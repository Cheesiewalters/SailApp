const authController = require("../auth");
const authService = require("../../services/auth");

jest.mock("../../services/auth");

describe("Auth controller", () => {
	describe("refreshToken", () => {
		it("should return 400 Response when refreshToken is unsuccessfull", async () => {
			// arrange
			authService.refreshToken.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};
			const req = {
				body: {
					email: "email@gmail.com",
					password: "123132",
					roleid: 1,
				},
			};

			// act
			await authController.refreshTokenController(req, res);

			// assert
			expect(authService.refreshToken).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(400);
		});

		it("should return 200 Response when refreshToken is successfull", async () => {
			// arrange
			const accessToken = [{ id: 1 }];
			authService.refreshToken.mockReturnValueOnce(accessToken);

			const res = {};
			const req = {
				body: {
					email: "email@gmail.com",
					password: "123132",
					roleid: 1,
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await authController.refreshTokenController(req, res);

			// assert
			expect(authService.refreshToken).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ accessToken: accessToken })
			);
		});
	});
	describe("register", () => {
		it("should return 201 Response when register is successfull", async () => {
			// arrange
			const accessToken = [{ id: 1 }];
			authService.createUser.mockReturnValueOnce(accessToken);

			const res = {};
			const req = {
				body: {
					email: "email@gmail.com",
					password: "123132",
					roleid: 1,
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await authController.register(req, res);

			// assert
			expect(authService.createUser).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledTimes(1);
		});
	});
	describe("login", () => {
		it("should return 204 Response when login is unsuccessfull", async () => {
			// arrange
			authService.login.mockReturnValueOnce([]);

			const res = {
				sendStatus: jest.fn(),
			};
			const req = {
				body: {
					email: "email@gmail.com",
					password: "123132",
				},
			};

			// act
			await authController.loginController(req, res);

			// assert
			expect(authService.login).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(500);
		});

		it("should return 201 Response when login is successfull", async () => {
			// arrange
			const accessToken = [{ id: 1 }];
			const refreshToken = [{ id: 1 }];
			authService.login.mockReturnValueOnce(accessToken, refreshToken);

			const res = {};
			const req = {
				body: {
					email: "cwalters01@qub.ac.uk",
					password: "123123",
				},
			};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);

			// act
			await authController.loginController(req, res);

			// assert
			expect(authService.login).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({
					accessToken: undefined,
					refreshToken: undefined,
				})
			);
		});
	});
});
