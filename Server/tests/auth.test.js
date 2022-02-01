const authController = require("../controllers/auth");
const authService = require("../services/auth");

jest.mock("../services/auth");

describe("Auth controller", () => {
	describe("refreshToken", () => {
		it("should return 204 Response when refreshToken is unsuccessfull", async () => {
			// arrange
			authService.refreshTokenService.mockReturnValueOnce([]);

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
			await authController.refreshToken(req, res);

			// assert
			expect(authService.refreshTokenService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return 201 Response when refreshToken is successfull", async () => {
			// arrange
			const accessToken = [{ id: 1 }];
			authService.refreshTokenService.mockReturnValueOnce(accessToken);

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
			await authController.refreshToken(req, res);

			// assert
			expect(authService.refreshTokenService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ accessToken: accessToken })
			);
		});
	});
	describe("register", () => {
		it("should return 204 Response when register is unsuccessfull", async () => {
			// arrange
			authService.registerService.mockReturnValueOnce([]);

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
			await authController.register(req, res);

			// assert
			expect(authService.registerService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(500);
		});

		it("should return 201 Response when register is successfull", async () => {
			// arrange
			const accessToken = [{ id: 1 }];
			authService.registerService.mockReturnValueOnce(accessToken);

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
			expect(authService.registerService).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({ accessToken: accessToken })
			);
		});
	});
	describe("login", () => {
		it("should return 204 Response when login is unsuccessfull", async () => {
			// arrange
			authService.loginService.mockReturnValueOnce([]);

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
			await authController.login(req, res);

			// assert
			expect(authService.loginService).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledTimes(1);
			expect(res.sendStatus).toHaveBeenCalledWith(500);
		});

		it("should return 201 Response when login is successfull", async () => {
			// arrange
			const accessToken = [{ id: 1 }];
			const refreshToken = [{ id: 1 }];
			authService.loginService.mockReturnValueOnce(accessToken, refreshToken);

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
			await authController.login(req, res);

			// assert
			expect(authService.loginService).toHaveBeenCalledTimes(1);
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
