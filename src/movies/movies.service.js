const knex = require("../db/connection");
const Movie = require("../models/movie");

const getAllMovies = () => Movie.query();

const getAllIsShowingMovies = () =>
    knex("movies as m")
        .select("m.*")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .where("mt.is_showing", true)
        .groupBy("m.movie_id");

const getMovieById = (id) =>
    Movie.query()
        .findById(id);

module.exports = {
    getAllMovies,
    getMovieById,
    getAllIsShowingMovies,
}