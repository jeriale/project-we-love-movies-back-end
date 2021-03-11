const service = require("./theaters.service");

async function list(req, res, next) {
    const { movieId } = req.params;
    console.log(movieId);

    movieId
        ? res.json({ data: await service.getAllTheatersByMovieId(movieId) })
        : res.json({ data: await service.getAllTheatersWithMovies() });
}

module.exports = {
    list,
}