import request from "supertest";
import { app } from "../../app";

let accessToken: string;
let refreshToken: string;

beforeAll(async () => {
  const loginResponse = await request(app).post("/auth/").send({
    email: "walters@google.com",
    password: "hashedPassword",
  });

  accessToken = loginResponse.body.accessToken;
  refreshToken = loginResponse.body.refreshToken;
});

describe("/authentication", () => {
  describe("POST /login", () => {
    it("should return 200 when login succeeds", async () => {
      await request(app)
        .post("/auth/login")
        .send({
          email: "walters@google.com",
          password: "hashedPassword",
        })
        .expect(200);
    });
    it("should return 401 when login fails", async () => {
      await request(app)
        .post("/auth/login")
        .send({
          email: "walters@google.com",
          password: "WRONG-PASSWORD",
        })
        .expect(401);
    });
  });
  describe("POST /", () => {
    it("should return 201 when registration succeeds", async () => {
      await request(app)
        .post("/auth")
        .send({
          email: "newUser@google.com",
          password: "hashedPassword",
          roleid: 1,
        })
        .expect(201);
    });
  });
});
