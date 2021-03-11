const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;

    const movie = await service.getMovieById(movieId);

    const error = { status: 404, message: "Movie cannot be found." };

    if (!movie) return next(error);

    res.locals.movie = movie;
    res.locals.movieId = movieId;

    next();
}

async function list(req, res, next) {
    let { is_showing = [] } = req.query;

    if (is_showing.includes("true")) {
        return res.json({ data: await service.getAllIsShowingMovies() });
    }

    res.json({ data: await service.getAllMovies() });
}

async function read(req, res, next) {
    const movie = res.locals.movie;
    res.json({ data: movie });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read]
}