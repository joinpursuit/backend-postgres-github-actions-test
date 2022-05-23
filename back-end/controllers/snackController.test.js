const request = require("supertest");

const app = require("../app.js");

// Database
const db = require("../db");
const resetSnacksTable = require("../db/schema/00.snacks-table");
const seedSnacks = require("../db/seeds/01.snacks");

describe("snacks", () => {
  beforeEach(async () => {
    await resetSnacksTable();
    await seedSnacks();
  });

  afterAll(() => {
    db.$pool.end();
  });

  describe("/snacks/:id", () => {
    describe("GET", () => {
      it("with correct id - fetches the correct snack", async () => {
        const response = await request(app).get("/snacks/1");
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(parsedRes.payload.id).toEqual(1);
        expect(parsedRes.payload.name).toEqual("Strawberries");
      });

      it("with incorrect id - sets status to 404 and returns error key", async () => {
        const response = await request(app).get("/snacks/98989898");
        const parsedRes = JSON.parse(response.text);

        expect(response.statusCode).toEqual(404);
        expect(parsedRes.success).toBe(false);
      });
    });
    describe("DELETE", () => {
      it("with valid id - deletes the correct snack", async () => {
        const response = await request(app).delete("/snacks/1").send();
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(parsedRes.payload.id).toEqual(1);
        expect(parsedRes.payload.name).toEqual("Strawberries");
      });

      it("with invalid id - does not delete anything", async () => {
        const response = await request(app).delete("/snacks/99999").send();
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(false);
        expect(parsedRes.payload.id).toBe(undefined);
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
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.payload).toEqual(expect.arrayContaining(expected));
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

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.image).toEqual(
          "https://i3.wp.com/onmykidsplate.com/wp-content/uploads/2018/09/Halloween-Snack-Spider-Peanut-Butter-Celery.jpg"
        );
      });
      it("with valid snack name but no image - can create a snack with default image", async () => {
        const response = await request(app).post("/snacks").send({
          name: "banana",
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Banana");
        expect(parsedRes.payload.image).toEqual(
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

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Spiders on a Log");
      });

      it("with valid snack name, will capitalize as expected", async () => {
        const response = await request(app).post("/snacks").send({
          name: "COMBOS",
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Combos");
      });

      it("with valid snack name mixed capitalization - can create a properly capitalized snack", async () => {
        const response = await request(app).post("/snacks").send({
          name: "FLAMIN' hot Cheetoes",
        });

        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.name).toEqual("Flamin' Hot Cheetoes");
      });
    });
  });
});
