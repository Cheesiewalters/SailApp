import { Request, Response } from "express";
import { AuthService } from "../services";

const createdStatus = 201;
const okStatus = 200;

async function refreshTokenController(req: Request, res: Response) {
  const data = await AuthService.refreshToken(req.body);
  return res.status(okStatus).json({
    accessToken: data,
  });
}

const register = async (req, res) => {
  await AuthService.createUser(req.body);

  res.status(createdStatus).json();
};

const loginController = async (req: Request, res: Response) => {
  try {
    const data = await AuthService.login(req.body);
    res.status(200).json({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (error) {
    res.status(401).json("Invalid credentials");
  }
};

const getUserByEmailController = async (req: Request, res: Response) => {
  const users = await AuthService.getUserByEmail(req.body);
  res.status(200).json({
    data: users,
  });
};

export {
  refreshTokenController,
  register,
  loginController,
  getUserByEmailController,
};
