const { Model } = require('objection');
const knex = require("../db/connection");

Model.knex(knex);

class Theater extends Model {
  static get tableName() {
    return "theaters";
  }

  static get relationMappings() {
    const Movie = require("./movie");
    return {
      movies: {
        relation: Model.ManyToManyRelation,
        modelClass: Movie,
        join: {
          from: "theaters.theater_id",
          through: {
            from: "movies_theaters.theater_id",
            to: "movies_theaters.movie_id"
          },
          to: "movies.movie_id"
        }
      }
    }
  }
}

module.exports = Theater;