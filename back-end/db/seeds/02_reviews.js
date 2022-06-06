/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw("ALTER SEQUENCE reviews_id_seq RESTART");

  await knex("reviews").insert([
    {
      reviewer_name: "David",
      content:
        "Esse veniam pariatur adipisicing adipisicing non eiusmod eu sit ut nostrud aute.",
      rating: 4,
      snack_id: 1,
    },
    {
      reviewer_name: "Xander",
      content:
        "Mollit laborum non ut tempor amet ea laborum voluptate elit laboris sint sunt officia nostrud.",
      rating: 3,
      snack_id: 1,
    },
    {
      reviewer_name: "Kayla",
      content:
        "Sint ea reprehenderit cupidatat sunt eu nisi aute id commodo anim magna et fugiat.",
      rating: 4,
      snack_id: 1,
    },
    {
      reviewer_name: "Xander",
      content: "Aliquip dolore tempor nostrud qui ullamco officia.",
      rating: 5,
      snack_id: 2,
    },
    {
      reviewer_name: "Angie",
      content:
        "Velit culpa fugiat irure culpa ipsum deserunt sit laborum mollit ut tempor veniam est.",
      rating: 5,
      snack_id: 2,
    },
    {
      reviewer_name: "Emily",
      content: "Aliqua labore deserunt Lorem nostrud sit.",
      rating: 3,
      snack_id: 2,
    },
    {
      reviewer_name: "Reggie",
      content: "Ut aute fugiat quis tempor cupidatat eiusmod sit ut veniam.",
      rating: 5,
      snack_id: 2,
    },
    {
      reviewer_name: "Reggie",
      content: "In nisi laboris irure deserunt cupidatat minim esse eu id.",
      rating: 2,
      snack_id: 3,
    },
    {
      reviewer_name: "Phoenix",
      content: "Proident occaecat exercitation nostrud velit.",
      rating: 1,
      snack_id: 3,
    },
    {
      reviewer_name: "Jaden",
      content: "In irure est exercitation veniam tempor ea exercitation eu.",
      rating: 2,
      snack_id: 3,
    },
    {
      reviewer_name: "Eli",
      content:
        "Culpa quis incididunt enim laboris cupidatat anim voluptate non consectetur veniam eiusmod.",
      rating: 3,
      snack_id: 4,
    },
    {
      reviewer_name: "Stef",
      content: "Incididunt sunt eiusmod sunt in nulla.",
      rating: 1,
      snack_id: 5,
    },
    {
      reviewer_name: "Oliver",
      content: "Proident commodo Lorem sint laborum.",
      rating: 1,
      snack_id: 5,
    },
  ]);
};
