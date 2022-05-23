const request = require("supertest");

const app = require("../app.js");

// Database
const db = require("../db");
const dropTables = require("../db/schema/00.drop");
const snacksTable = require("../db/schema/01.snacks");
const seedSnacks = require("../db/seeds/01.snacks");
const reviewsTable = require("../db/schema/02.reviews");
const seedReviews = require("../db/seeds/02.reviews");

describe("reviews", () => {
  beforeEach(async () => {
    await dropTables();
    await snacksTable();
    await seedSnacks();
    await reviewsTable();
    await seedReviews();
  });

  afterAll(() => {
    db.$pool.end();
  });

  describe("/reviews/:id", () => {
    describe("GET", () => {
      it("with correct id - fetches the correct review", async () => {
        const response = await request(app).get("/reviews/1");
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(parsedRes.payload.id).toEqual(1);
        expect(parsedRes.payload.reviewer_name).toEqual("David");
      });

      it("with incorrect id - sets status to 404 and returns error key", async () => {
        const response = await request(app).get("/reviews/98989898");
        const parsedRes = JSON.parse(response.text);

        expect(response.statusCode).toEqual(404);
        expect(parsedRes.success).toBe(false);
      });
    });
    describe("DELETE", () => {
      it("with valid id - deletes the correct review", async () => {
        const response = await request(app).delete("/reviews/1").send();
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(true);
        expect(parsedRes.payload.id).toEqual(1);
        expect(parsedRes.payload.reviewer_name).toEqual("David");
      });

      it("with invalid id - does not delete anything", async () => {
        const response = await request(app).delete("/reviews/99999").send();
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.success).toBe(false);
        expect(parsedRes.payload.id).toBe(undefined);
      });
    });
  });

  describe("/reviews", () => {
    describe("GET", () => {
      it("returns all reviews", async () => {
        const expected = [
          {
            content:
              "Esse veniam pariatur adipisicing adipisicing non eiusmod eu sit ut nostrud aute.",
            id: 1,
            rating: 4,
            reviewer_name: "David",
            snack_id: 1,
          },
          {
            content:
              "Mollit laborum non ut tempor amet ea laborum voluptate elit laboris sint sunt officia nostrud.",
            id: 2,
            rating: 3,
            reviewer_name: "Xander",
            snack_id: 1,
          },
          {
            content:
              "Sint ea reprehenderit cupidatat sunt eu nisi aute id commodo anim magna et fugiat.",
            id: 3,
            rating: 4,
            reviewer_name: "Kayla",
            snack_id: 1,
          },
          {
            content: "Aliquip dolore tempor nostrud qui ullamco officia.",
            id: 4,
            rating: 5,
            reviewer_name: "Xander",
            snack_id: 2,
          },
          {
            content:
              "Velit culpa fugiat irure culpa ipsum deserunt sit laborum mollit ut tempor veniam est.",
            id: 5,
            rating: 5,
            reviewer_name: "Angie",
            snack_id: 2,
          },
          {
            content: "Aliqua labore deserunt Lorem nostrud sit.",
            id: 6,
            rating: 3,
            reviewer_name: "Emily",
            snack_id: 2,
          },
          {
            content:
              "Ut aute fugiat quis tempor cupidatat eiusmod sit ut veniam.",
            id: 7,
            rating: 5,
            reviewer_name: "Reggie",
            snack_id: 2,
          },
          {
            content:
              "In nisi laboris irure deserunt cupidatat minim esse eu id.",
            id: 8,
            rating: 2,
            reviewer_name: "Reggie",
            snack_id: 3,
          },
          {
            content: "Proident occaecat exercitation nostrud velit.",
            id: 9,
            rating: 1,
            reviewer_name: "Phoenix",
            snack_id: 3,
          },
          {
            content:
              "In irure est exercitation veniam tempor ea exercitation eu.",
            id: 10,
            rating: 2,
            reviewer_name: "Jaden",
            snack_id: 3,
          },
          {
            content:
              "Culpa quis incididunt enim laboris cupidatat anim voluptate non consectetur veniam eiusmod.",
            id: 11,
            rating: 3,
            reviewer_name: "Eli",
            snack_id: 4,
          },
          {
            content: "Incididunt sunt eiusmod sunt in nulla.",
            id: 12,
            rating: 1,
            reviewer_name: "Stef",
            snack_id: 5,
          },
          {
            content: "Proident commodo Lorem sint laborum.",
            id: 13,
            rating: 1,
            reviewer_name: "Oliver",
            snack_id: 5,
          },
        ];

        const response = await request(app).get("/reviews").expect(200);
        const parsedRes = JSON.parse(response.text);

        expect(parsedRes.payload).toEqual(expect.arrayContaining(expected));
      });
    });

    describe("POST", () => {
      it("with valid review - can create a review", async () => {
        const response = await request(app).post("/reviews").send({
          content:
            "Duis eiusmod anim nisi dolor culpa esse sunt dolor labore Lorem enim.",
          rating: 3,
          reviewer_name: "Gina",
          snack_id: 1,
        });

        const parsedRes = JSON.parse(response.text);
        expect(parsedRes.success).toBe(true);
        expect(!!parsedRes.payload.id).toBe(true);
        expect(parsedRes.payload.content).toEqual(
          "Duis eiusmod anim nisi dolor culpa esse sunt dolor labore Lorem enim."
        );
      });
    });
  });
});
