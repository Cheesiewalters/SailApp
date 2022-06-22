import express from "express";
import { validateAuth } from "../middleware/validation/auth";
import {
  register,
  refreshTokenController,
  loginController,
} from "../controllers/auth";

const AuthRouter = express.Router();

AuthRouter.route("/token").post(refreshTokenController);
AuthRouter.route("/login").post(validateAuth, loginController);
AuthRouter.route("/").post(validateAuth, register);

export { AuthRouter };
