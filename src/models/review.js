const { Model } = require("objection");
const knex = require("../db/connection");

Model.knex(knex);

class Review extends Model {
    static get tableName() {
        return "reviews";
    }

    static get idColumn() {
        return "review_id"
    }

    static get relationMappings() {
        const Critic = require("../models/critic");
        return {
            critic: {
                relation: Model.HasOneRelation,
                modelClass: Critic,
                join: {
                    from: "reviews.critic_id",
                    to: "critics.critic_id"
                }
            }
        }
    }
}

module.exports = Review;