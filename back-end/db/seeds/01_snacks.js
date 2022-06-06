/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw("ALTER SEQUENCE snacks_id_seq RESTART");

  await knex("snacks").insert([
    {
      name: "Strawberries",
      fiber: 20,
      protein: 10,
      added_sugar: 0,
      is_healthy: true,
      image: "https://picsum.photos/id/1080/300/300",
    },
    {
      name: "Raspberries",
      fiber: 16,
      protein: 4,
      added_sugar: 0,
      is_healthy: true,
      image: "https://picsum.photos/id/102/300/300",
    },
    {
      name: "Honey Covered Granola",
      fiber: 30,
      protein: 12,
      added_sugar: 22,
      is_healthy: false,
      image: "https://picsum.photos/id/312/300/300",
    },
    {
      name: "New Wave Nuts",
      fiber: 11,
      protein: 55,
      added_sugar: 9,
      is_healthy: true,
      image: "https://picsum.photos/id/139/300/300",
    },
    {
      name: "Raw Onions & Turnips",
      fiber: 11,
      protein: 9,
      added_sugar: 9,
      is_healthy: true,
      image: "https://picsum.photos/id/292/300/300",
    },
    {
      name: "Healthy Birthday Cake Square",
      fiber: 4,
      protein: 8,
      added_sugar: 19,
      is_healthy: false,
      image:
        "https://content.nutrisystem.com/images/products/alc/large/BirthdayCakeSquare_L.jpg",
    },
  ]);
};
