import { prisma } from "../utilities";
import bcrypt from "bcrypt";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../middleware/jwt";

async function createUser(body: any) {
  body.password = bcrypt.hashSync(body.password, 8);
  await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      roleid: body.roleid,
    },
  });
}

async function login(body: any) {
  const user = await getUserByEmail(body);
  if (!user) {
    throw new Error("User not found");
  }
  const checkPassword = bcrypt.compareSync(body.password, user.password);
  if (!checkPassword) throw new Error("Password is incorrect");
  const accessToken = signAccessToken({
    userid: user.id,
    userRole: user.roleid,
  });
  const refreshToken = signRefreshToken({
    userid: user.id,
    userRole: user.roleid,
  });
  return { accessToken, refreshToken };
}

async function refreshToken(body: any) {
  const decodedToken: any = await verifyRefreshToken(body.refreshToken);
  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.payload.userid,
    },
  });
  const rT = signAccessToken({
    userid: user.id,
    userRole: user.roleid,
  });
  return rT;
}

async function getUserByEmail(body: any) {
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  return user;
}

const AuthService = {
  createUser,
  login,
  refreshToken,
  getUserByEmail,
};

export { AuthService };
