import { loginController, refreshTokenController } from "../auth";
import { when } from "jest-when";
import { AuthService } from "../../services";
import { mockRequest, mockResponse } from "../../test-util";
import jwt from "jsonwebtoken";

jest.mock("../../services");
jest.mock("jsonwebtoken");

const mockDecodedToken = {
  sub: 1,
  iat: 1647524603,
  exp: 1647525803,
} as any;

describe("Authentication Controller", () => {
  describe("login", () => {
    it("should return 200 with valid username and password", async () => {
      const req = mockRequest({
        body: {
          email: "conor.walters@google.com",
          password: "hashedPassword",
        },
      });

      const res = mockResponse();

      const mockReturnValue = {
        accessToken: "",
        refreshToken: "",
      };

      when(AuthService.login)
        .calledWith(req.body)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await loginController(req, res);

      expect(AuthService.login).toHaveBeenCalledTimes(1);
      expect(AuthService.login).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
    it("should return 401 with invalid password", async () => {
      const req = mockRequest({
        body: {
          email: "sundar.pichai@google.com",
          password: "wrongPassword",
        },
      });

      const res = mockResponse();

      when(AuthService.login)
        .calledWith(req.body)
        .mockReturnValueOnce(Promise.reject());

      await loginController(req, res);

      expect(AuthService.login).toHaveBeenCalledTimes(1);
      expect(AuthService.login).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
  describe("refresh", () => {
    it("should return 200 with new accessToken when refreshToken provided", async () => {
      const refreshToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCIIkpXVCJ9.eyJzdWIiOjEsImF2YWlsYWJsZVRlbmFudHMiOltdLCJpYXQiOjE2NDczNDk3MzcsImV4cCI6MTY0NzM3ODUzN30.ZJvp734ao6vQxFAp6OfZbWcALQTxILPCCekweLIoUIw";

      const req = mockRequest({
        body: {
          refreshToken,
        },
      });

      const res = mockResponse();

      const mockReturnValue = {
        accessToken: "",
        refreshToken: "",
      };

      jwt.decode = jest.fn().mockReturnValueOnce(mockDecodedToken);

      when(AuthService.refreshToken)
        .calledWith(req.body)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await refreshTokenController(req, res);

      expect(AuthService.refreshToken).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
