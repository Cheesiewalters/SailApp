import request from "supertest";
import { app } from "../../app";

describe("/race", () => {
  describe("POST race/:id/boat", () => {
    it("should return 200", async () => {
      await request(app)
        .post("/race/1/boat")
        .send({
          boatId: 2,
          startTime: "2021-11-17 12:00:00",
          finishTime: "2021-11-16 19:15:00",
          position: 3,
        })
        .expect(200);
    });
  });
  describe("GET /race/:id/boat", () => {
    it("should return 200", async () => {
      await request(app).get("/race/1/boat").expect(200);
    });
  });
  describe("PUT /race/:id/boat", () => {
    it("should return 200", async () => {
      await request(app)
        .put("/race/1/boat")
        .send({
          boatId: 2,
          startTime: "2021-11-17 12:00:00",
          finishTime: "2021-11-16 19:15:00",
          position: 2,
        })
        .expect(200);
    });
  });
  describe("GET /race/:id/boat/:id", () => {
    it("should return 200", async () => {
      await request(app).get("/race/1/boat/3").expect(200);
    });
  });
  describe("GET /race", () => {
    it("should return 200", async () => {
      await request(app).get("/race").expect(200);
    });
  });
  describe("GET /race/:id", () => {
    it("should return 200", async () => {
      await request(app).get("/race/1").expect(200);
    });
  });
  describe("POST /race/", () => {
    it("should return 200 when boat update succeeds", async () => {
      await request(app)
        .post("/race")
        .send({
          eventId: 2,
          classId: 3,
          startTime: "2021-12-02 09:15:15",
        })
        .expect(200);
    });
  });
  describe("PUT /race/1", () => {
    it("should return 200 when boat update succeeds", async () => {
      await request(app)
        .put("/race/1")
        .send({
          eventId: 2,
          classId: 3,
          startTime: "2021-12-04 09:15:00",
        })
        .expect(200);
    });
  });
});
