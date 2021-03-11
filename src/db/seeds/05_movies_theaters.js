const generateMoviesTheatersJoins = (movieIds, theaterIds) => {
    return movieIds
      .map(({ movie_id: movieId }) => {
        return theaterIds.map(({ theater_id: theaterId }) => {
          return {
            is_showing: true,
            theater_id: theaterId,
            movie_id: movieId,
          };
        });
      })
      .reduce((a, b) => a.concat(b), [])
      .filter((reviews) => reviews.theater_id);
};

exports.seed = async function (knex) {
  const movieIds = await knex("movies").select("movie_id");
  const theaterIds = await knex("theaters").select("theater_id");

  const joins = generateMoviesTheatersJoins(movieIds, theaterIds);

//  Attempted to RESTART IDENTITY CASCADE at KNEX SEED:RUN,
//  which results in a SQLITE syntax error:

//  return knex
//    .raw("TRUNCATE TABLE movies RESTART IDENTITY CASCADE")
//    .then(function () {
        return knex("movies_theaters").insert(joins);
//    });
};
