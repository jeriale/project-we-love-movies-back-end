const Review = require("../models/review");

const getReviewById = (id) =>
    Review.query()
        .findById(id);

const updateReviewById = (id, body) =>
    Review.query()
        .patchAndFetchById(id, body)
        .withGraphFetched("critic");

const deleteReviewById = (id) =>
    Review.query()
        .deleteById(id);

const getReviewsByMovie = (id) =>
    Review.query()
        .where("reviews.movie_id", "=", id)
        .withGraphFetched("critic");

module.exports = {
    updateReviewById,
    deleteReviewById,
    getReviewsByMovie,
    getReviewById,
}