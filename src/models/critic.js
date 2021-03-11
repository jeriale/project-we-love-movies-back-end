const { Model } = require("objection");
const knex = require("../db/connection");

Model.knex(knex);

class Critic extends Model {
    static get tableName() {
        return "critics";
    }
}

module.exports = Critic;