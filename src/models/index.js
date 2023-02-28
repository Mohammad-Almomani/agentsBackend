"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const post = require("./post.model");
const comment = require("./comment.model");
const user = require("./user.model");

const Collection = require("../actions/collections/user-comment-routes");

const POSTGRES_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:1312@localhost:5432/postgres";

// const sequelizeOption = {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// };

const sequelize = new Sequelize(POSTGRES_URL /*, sequelizeOption*/);
const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize, DataTypes);
const userModel = user(sequelize, DataTypes);

// Relations:
// Item has many Comments, Comment belongs to one Item.
// note that the foreign key for the one-to-many relation will be added to the target model
// sourceKey: "id" is the primary key of the source model

postModel.hasMany(commentModel, { foreignKey: "postID", sourceKey: "id" });
commentModel.belongsTo(postModel, { foreignKey: "postID", targetKey: "id" });

userModel.hasMany(commentModel, { foreignKey: "userID", sourceKey: "id" });
commentModel.belongsTo(userModel, { foreignKey: "userID", targetKey: "id" });

userModel.hasMany(postModel, { foreignKey: "userID", sourceKey: "id" });
postModel.belongsTo(userModel, { foreignKey: "userID", targetKey: "id" });

const postCollection = new Collection(postModel);
const commentsCollection = new Collection(commentModel);

module.exports = {
  db: sequelize,
  Post: postCollection,
  Comment: commentsCollection,
  commentModel: commentModel,
  Users: userModel,
};