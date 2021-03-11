const express = require("express");
const app = express();

const cors = require("cors");

const theatersRouter = require("./theaters/theaters.router");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use((req, res, next) => {
    next({
        status: 404,
        message: "The route you are looking for doesn't exist."
    });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).json({ error: message });
});

module.exports = app;
