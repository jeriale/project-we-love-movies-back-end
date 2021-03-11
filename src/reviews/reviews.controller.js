const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;

    const review = await service.getReviewById(reviewId);

    const error = { status: 404, message: "Review cannot be found." };

    if (!review) return next(error);

    res.locals.review = review;
    res.locals.reviewId = reviewId;

    next();
}

async function list(req, res, next) {
    const { movieId } = req.params;
    res.json({ data: await service.getReviewsByMovie(movieId) });
}

function read(req, res, next) {
    const review = res.locals.review;
    res.json({ data: review });
}

async function update(req, res, next) {
    const reviewId = res.locals.reviewId;
    res.json({ data: await service.updateReviewById(reviewId, req.body.data) });
}

async function destroy(req, res, next) {
    const reviewId = res.locals.reviewId;
    res.status(204).json({ data: await service.deleteReviewById(reviewId) });
}

module.exports = {
    read: [asyncErrorBoundary(reviewExists), read],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    list
}