const request = require("supertest");

const app = require("../app.js");

// Database
const db = require("../db");

describe("reviews", () => {
  beforeEach(() => db.seed.run());
  afterAll(() => db.destroy());

  describe("/reviews/:id", () => {
    describe("GET", () => {
      it("with correct id - fetches the correct review", async () => {
        const response = await request(app).get("/reviews/1");

        expect(response.body.success).toBe(true);
        expect(response.body.payload.id).toEqual(1);
        expect(response.body.payload.reviewer_name).toEqual("David");
      });

      it("with incorrect id - sets status to 404 and returns error key", async () => {
        const response = await request(app).get("/reviews/98989898");

        expect(response.statusCode).toEqual(404);
        expect(response.body.success).toBe(false);
      });
    });
    describe("DELETE", () => {
      it("with valid id - deletes the correct review", async () => {
        const response = await request(app).delete("/reviews/1").send();

        expect(response.body.success).toBe(true);
        expect(response.body.payload.id).toEqual(1);
        expect(response.body.payload.reviewer_name).toEqual("David");
      });

      it("with invalid id - does not delete anything", async () => {
        const response = await request(app).delete("/reviews/99999").send();

        expect(response.body.success).toBe(false);
        expect(response.body.payload.id).toBe(undefined);
      });
    });
    describe("PUT", () => {
      it("updates a review", async () => {
        const response = await request(app).put("/reviews/1").send({
          content:
            "Esse veniam pariatur adipisicing adipisicing non eiusmod eu sit ut nostrud aute.",
          rating: 5, // Changed field
          reviewer_name: "David",
          snack_id: 1,
        });

        expect(response.body.success).toBe(true);
        expect(response.body.payload.id).toEqual(1);
        expect(response.body.payload.rating).toEqual(5);
      });

      it("fails if the ID does not match an existing review", async () => {
        const response = await request(app).put("/reviews/99999").send({
          content:
            "Esse veniam pariatur adipisicing adipisicing non eiusmod eu sit ut nostrud aute.",
          rating: 5, // Changed field
          reviewer_name: "David",
          snack_id: 1,
        });

        expect(response.body.success).toBe(false);
      });

      it("fails if the `snack_id` does not match an existing snack", async () => {
        const response = await request(app).put("/reviews/1").send({
          content:
            "Esse veniam pariatur adipisicing adipisicing non eiusmod eu sit ut nostrud aute.",
          rating: 4,
          reviewer_name: "David",
          snack_id: 99, // Changed field
        });

        expect(response.body.success).toBe(false);
      });

      it("fails if the `rating` value is set below 1", async () => {
        const response = await request(app).put("/reviews/1").send({
          content:
            "Esse veniam pariatur adipisicing adipisicing non eiusmod eu sit ut nostrud aute.",
          rating: 0, // Changed field
          reviewer_name: "David",
          snack_id: 1,
        });

        expect(response.body.success).toBe(false);
      });

      it("fails if the `rating` value is set above 5", async () => {
        const response = await request(app).put("/reviews/1").send({
          content:
            "Esse veniam pariatur adipisicing adipisicing non eiusmod eu sit ut nostrud aute.",
          rating: 99, // Changed field
          reviewer_name: "David",
          snack_id: 1,
        });

        expect(response.body.success).toBe(false);
      });

      it("sets the `reviewer_name` value to 'Anonymous' if there is an attempt to unset it", async () => {
        const response = await request(app).put("/reviews/1").send({
          content:
            "Esse veniam pariatur adipisicing adipisicing non eiusmod eu sit ut nostrud aute.",
          rating: 4,
          reviewer_name: "", // Changed field
          snack_id: 1,
        });

        expect(response.body.success).toBe(true);
        expect(response.body.payload.id).toEqual(1);
        expect(response.body.payload.reviewer_name).toEqual("Anonymous");
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
        response.body.payload.forEach((resource) => {
          delete resource.created_at;
          delete resource.updated_at;
        });
        expect(response.body.payload).toEqual(expect.arrayContaining(expected));
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

        expect(response.body.success).toBe(true);
        expect(!!response.body.payload.id).toBe(true);
        expect(response.body.payload.content).toEqual(
          "Duis eiusmod anim nisi dolor culpa esse sunt dolor labore Lorem enim."
        );
      });

      it("sets the `reviewer_name` to 'Anonymous' if no `reviewer_name` is present", async () => {
        const response = await request(app).post("/reviews").send({
          content:
            "Duis eiusmod anim nisi dolor culpa esse sunt dolor labore Lorem enim.",
          rating: 3,
          snack_id: 1,
        });

        expect(response.body.success).toBe(true);
        expect(!!response.body.payload.id).toBe(true);
        expect(response.body.payload.content).toEqual(
          "Duis eiusmod anim nisi dolor culpa esse sunt dolor labore Lorem enim."
        );
        expect(response.body.payload.reviewer_name).toEqual("Anonymous");
      });

      it("fails if the referenced `snack_id` does not match an existing snack", async () => {
        const response = await request(app).post("/reviews").send({
          content:
            "Duis eiusmod anim nisi dolor culpa esse sunt dolor labore Lorem enim.",
          rating: 3,
          reviewer_name: "Gina",
          snack_id: 999,
        });

        expect(response.body.success).toBe(false);
      });

      it("fails if the `rating` value is below 1", async () => {
        const response = await request(app).post("/reviews").send({
          content:
            "Duis eiusmod anim nisi dolor culpa esse sunt dolor labore Lorem enim.",
          rating: 0,
          reviewer_name: "Gina",
          snack_id: 1,
        });

        expect(response.body.success).toBe(false);
      });

      it("fails if the `rating` value is above 5", async () => {
        const response = await request(app).post("/reviews").send({
          content:
            "Duis eiusmod anim nisi dolor culpa esse sunt dolor labore Lorem enim.",
          rating: 99,
          reviewer_name: "Gina",
          snack_id: 1,
        });

        expect(response.body.success).toBe(false);
      });
    });
  });
});
