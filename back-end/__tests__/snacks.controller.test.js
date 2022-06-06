const request = require("supertest");

const app = require("../app.js");

// Database
const db = require("../db");

describe("Snacks Resource", () => {
  beforeEach(() => db.seed.run());
  afterAll(() => db.destroy());

  describe("Snack CRUD routes", () => {});

  describe("/snacks/:id", () => {
    describe("GET", () => {
      it("with correct id - fetches the correct snack", async () => {
        const response = await request(app).get("/snacks/1");

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toEqual(1);
        expect(response.body.data.snack.name).toEqual("Strawberries");
      });

      it("with incorrect id - sets status to 404 and returns error key", async () => {
        const response = await request(app).get("/snacks/999999999");

        expect(response.statusCode).toEqual(404);
        expect(response.body.status).toBe("fail");
      });
    });
    describe("DELETE", () => {
      it("with valid id - deletes the correct snack", async () => {
        const response = await request(app).delete("/snacks/1");

        expect(response.body.status).toBe("success");
        expect(response.body.data).toEqual(null);
      });

      it("with invalid id - does not delete anything", async () => {
        const response = await request(app).delete("/snacks/999999999");

        expect(response.statusCode).toEqual(404);
        expect(response.body.status).toBe("fail");
      });
    });
    describe("PUT", () => {
      it("updates a snack", async () => {
        const response = await request(app).put("/snacks/1").send({
          name: "Strawberries",
          image: "https://picsum.photos/id/1080/300/300",
          fiber: 18, // Changed field
          protein: 10,
          added_sugar: 0,
          is_healthy: true,
        });

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toEqual(1);
        expect(response.body.data.snack.fiber).toEqual(18);
      });

      it("fails if the ID does not match an existing snack", async () => {
        const response = await request(app).put("/snacks/999999999").send({
          name: "Strawberries",
          image: "https://picsum.photos/id/1080/300/300",
          fiber: 18, // Changed field
          protein: 10,
          added_sugar: 0,
          is_healthy: true,
        });

        expect(response.statusCode).toEqual(404);
        expect(response.body.status).toBe("fail");
      });

      it("fails if the name is updated to be missing", async () => {
        const response = await request(app).put("/snacks/1").send({
          name: "", // Changed field
          image: "https://picsum.photos/id/1080/300/300",
          fiber: 20,
          protein: 10,
          added_sugar: 0,
          is_healthy: true,
        });

        expect(response.body.status).toBe("fail");
      });

      it("will use the default image if a snack is updated where the image is removed", async () => {
        const response = await request(app).put("/snacks/1").send({
          name: "Strawberries",
          image: "", // Changed field
          fiber: 20,
          protein: 10,
          added_sugar: 0,
          is_healthy: true,
        });

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toEqual(1);
        expect(response.body.data.snack.image).toEqual(
          "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
        );
      });

      it("will appropriately capitalize update snack names", async () => {
        const response = await request(app).put("/snacks/1").send({
          name: "ORGANIC strawberries (on sale)",
          image: "https://picsum.photos/id/1080/300/300",
          fiber: 20,
          protein: 10,
          added_sugar: 0,
          is_healthy: true,
        });

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toEqual(1);
        expect(response.body.data.snack.name).toEqual(
          "Organic Strawberries (on Sale)"
        );
      });
    });
  });

  describe("/snacks", () => {
    describe("GET", () => {
      it("returns all snacks", async () => {
        const expected = [
          {
            id: 1,
            name: "Strawberries",
            image: "https://picsum.photos/id/1080/300/300",
            fiber: 20,
            protein: 10,
            added_sugar: 0,
            is_healthy: true,
          },
          {
            id: 2,
            name: "Raspberries",
            image: "https://picsum.photos/id/102/300/300",
            fiber: 16,
            protein: 4,
            added_sugar: 0,
            is_healthy: true,
          },
          {
            id: 3,
            name: "Honey Covered Granola",
            image: "https://picsum.photos/id/312/300/300",
            fiber: 30,
            protein: 12,
            added_sugar: 22,
            is_healthy: false,
          },
          {
            id: 4,
            name: "New Wave Nuts",
            image: "https://picsum.photos/id/139/300/300",
            fiber: 11,
            protein: 55,
            added_sugar: 9,
            is_healthy: true,
          },
          {
            id: 5,
            name: "Raw Onions & Turnips",
            image: "https://picsum.photos/id/292/300/300",
            fiber: 11,
            protein: 9,
            added_sugar: 9,
            is_healthy: true,
          },
          {
            id: 6,
            name: "Healthy Birthday Cake Square",
            image:
              "https://content.nutrisystem.com/images/products/alc/large/BirthdayCakeSquare_L.jpg",
            fiber: 4,
            protein: 8,
            added_sugar: 19,
            is_healthy: false,
          },
        ];

        const response = await request(app).get("/snacks").expect(200);
        expect(response.body.data.snacks.length).toEqual(6);
        response.body.data.snacks.forEach((resource) => {
          delete resource.created_at;
          delete resource.updated_at;
        });

        expect(response.body.data.snacks).toEqual(
          expect.arrayContaining(expected)
        );
      });
    });

    describe("POST", () => {
      it("with valid snack name and image - can create a snack", async () => {
        const response = await request(app).post("/snacks").send({
          name: "Spiders on a Log",
          image:
            "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-Snack-Spider-Peanut-Butter-Celery.jpg",
          fiber: 6,
          protein: 6,
          added_sugar: 12,
        });

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toBeTruthy();
        expect(response.body.data.snack.image).toEqual(
          "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-Snack-Spider-Peanut-Butter-Celery.jpg"
        );
      });
      it("with valid snack name but no image - can create a snack with default image", async () => {
        const response = await request(app).post("/snacks").send({
          name: "banana",
        });

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toBeTruthy();
        expect(response.body.data.snack.name).toEqual("Banana");
        expect(response.body.data.snack.image).toEqual(
          "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
        );
      });

      it("with valid snack name but lowercase - can create a capitalized snack (will NOT capitalize words with 2 letter or less)", async () => {
        const response = await request(app).post("/snacks").send({
          name: "spiders on a log",
          image:
            "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-Snack-Spider-Peanut-Butter-Celery.jpg",
          fiber: 6,
          protein: 6,
          added_sugar: 12,
        });

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toBeTruthy();
        expect(response.body.data.snack.name).toEqual("Spiders on a Log");
      });

      it("with valid snack name, will capitalize as expected", async () => {
        const response = await request(app).post("/snacks").send({
          name: "COMBOS",
        });

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toBeTruthy();
        expect(response.body.data.snack.name).toEqual("Combos");
      });

      it("with valid snack name mixed capitalization - can create a properly capitalized snack", async () => {
        const response = await request(app).post("/snacks").send({
          name: "FLAMIN' hot Cheetoes",
        });

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toBeTruthy();
        expect(response.body.data.snack.name).toEqual("Flamin' Hot Cheetoes");
      });
    });
  });

  describe("/snacks/:id/reviews", () => {
    describe("GET", () => {
      it("returns all associated reviews for the snack", async () => {
        const response = await request(app).get("/snacks/1/reviews");

        expect(response.body.status).toBe("success");
        expect(response.body.data.snack.id).toEqual(1);
        expect(response.body.data.snack.name).toEqual("Strawberries");
        expect(response.body.data.snack.reviews.length).toEqual(3);
        expect(response.body.data.snack.reviews[0].reviewer_name).toEqual(
          "David"
        );
      });

      it("fails when given an incorrect id", async () => {
        const response = await request(app).get("/snacks/999/reviews");

        expect(response.statusCode).toEqual(404);
        expect(response.body.status).toBe("fail");
      });
    });
  });
});
