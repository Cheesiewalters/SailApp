import request from "supertest";
import { app } from "../../app";

describe("/club", () => {
  describe("GET clubs", () => {
    it("should return 200", async () => {
      await request(app).get("/club").expect(200);
    });
  });
  describe("POST /", () => {
    it("should return 200", async () => {
      await request(app)
        .post("/club")
        .send({
          name: "Larne Yacht Club",
        })
        .expect(200);
    });
  });
  describe("PUT /:id", () => {
    it("should return 200 when boat update succeeds", async () => {
      await request(app)
        .put("/club/1")
        .send({
          name: "Sailing yacht club",
        })
        .expect(200);
    });
  });
  describe("GET /:id", () => {
    it("should return 200", async () => {
      await request(app).get("/club/1").expect(200);
    });
  });
});
