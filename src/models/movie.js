const { Model } = require("objection");
const knex = require("../db/connection");

Model.knex(knex);

class Movie extends Model {
    static get tableName() {
        return "movies";
    }

    static get idColumn() {
        return "movie_id";
    }
}

module.exports = Movie;