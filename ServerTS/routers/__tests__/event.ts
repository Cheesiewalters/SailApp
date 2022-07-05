import request from "supertest";
import { app } from "../../app";

describe("/event", () => {
  describe("GET events", () => {
    it("should return 200", async () => {
      await request(app).get("/event").expect(200);
    });
  });
  describe("GET /event/types", () => {
    it("should return 200", async () => {
      await request(app).get("/event/types").expect(200);
    });
  });
  describe("GET /event/search/?q=Wexford", () => {
    it("should return 200", async () => {
      await request(app).get("/event/search/?q=Wexford").expect(200);
    });
  });
  describe("GET /event/:id", () => {
    it("should return 200 when boat update succeeds", async () => {
      await request(app).get("/event/1").expect(200);
    });
  });
  describe("POST /event/", () => {
    it("should return 200 when boat update succeeds", async () => {
      await request(app)
        .post("/event")
        .send({
          eventTypeId: 2,
          startTime: "2021-04-26 16:00:00",
          endDate: "2021-06-26 17:45:00",
          name: "This is an event name",
          clubId: 4,
          description: "This is a description",
        })
        .expect(200);
    });
  });
  describe("PUT /event/1", () => {
    it("should return 200 when boat update succeeds", async () => {
      await request(app)
        .put("/event/1")
        .send({
          eventTypeId: 2,
          startTime: "2021-04-26 16:00:00",
          endDate: "2021-06-26 17:45:00",
          name: "This is an event name",
          clubId: 4,
          description: "Updated Description",
        })
        .expect(200);
    });
  });
});
