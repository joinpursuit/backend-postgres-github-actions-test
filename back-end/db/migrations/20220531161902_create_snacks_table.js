/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("snacks", (table) => {
    table.increments("id").primary();

    table.text("name");
    table.text("image");
    table.integer("fiber");
    table.integer("protein");
    table.integer("added_sugar");
    table.boolean("is_healthy");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("snacks");
};
