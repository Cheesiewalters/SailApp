import request from "supertest";
import { app } from "../../app";

describe("/boat", () => {
  describe("GET boats", () => {
    it("should return 200", async () => {
      await request(app).get("/boat").expect(200);
    });
  });
  describe("GET boat classes", () => {
    it("should return 200", async () => {
      await request(app).get("/boat/class").expect(200);
    });
  });
  describe("POST /", () => {
    it("should return 204 when boat creation succeeds", async () => {
      await request(app)
        .post("/boat")
        .send({
          classId: 2,
          clubId: 3,
          sailNo: "12324",
          name: "QUB Firefly 6",
        })
        .expect(204);
    });
  });
  describe("PUT /:id", () => {
    it("should return 200 when boat update succeeds", async () => {
      await request(app)
        .put("/boat/1")
        .send({
          classId: 2,
          clubId: 3,
          sailNo: "12324",
          name: "New name",
        })
        .expect(200);
    });
  });
  describe("GET /:id", () => {
    it("should return 200", async () => {
      await request(app).get("/boat/1").expect(200);
    });
  });
});
