
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id");
    table.integer("theater_id");
    table.boolean("is_showing");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters");
};
