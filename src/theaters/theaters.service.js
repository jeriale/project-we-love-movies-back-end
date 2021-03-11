const knex = require("../db/connection");
const Theater = require("../models/theater");

const getAllTheatersWithMovies = () =>
    Theater.query()
        .withGraphFetched('movies');

const getAllTheatersByMovieId = (id) =>
    knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .where({ "m.movie_id": id })
        .select("t.*", "mt.is_showing", "m.movie_id");

module.exports = {
    getAllTheatersWithMovies,
    getAllTheatersByMovieId,
}