const request = require("supertest");
const app = require("../app.js");

describe("Error handling", () => {
  describe("catch-all handler", () => {
    it("responds with status code 404 and a status of 'fail' if the requested route does not exist", async () => {
      const response = await request(app).get("/incorrect/route");

      expect(response.statusCode).toEqual(404);
      expect(response.body.status).toEqual("fail");
    });
  });
});
