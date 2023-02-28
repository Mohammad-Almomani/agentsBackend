"use strict";

class postCommentsRoutes {
  constructor(model) {
    this.model = model;
  }

  // CRUD operations, create, read, update, delete, so we don't have to write them again and again
  async create(obj) {
    try {
      return await this.model.create(obj);
    } catch (e) {
      return `Error while creating the data for model ${this.model.name}`;
    }
  }

  async read(id) {
    try {
      if (id) {
        return await this.model.findOne({ where: { id: id } });
      } else {
        return await this.model.findAll();
      }
    } catch (e) {
      return `Error in reading data with the id: ${id}`;
    }
  }
  async readSpecificComment(postID, userID) {
    try {
      return await this.model.findAll({
        where: { postID: postID, userID: userID },
      });
    } catch (e) {
        return `Error in reading data with the id: ${postID} and ${userID}`;
    }
  }

  async readComments(id) {
    try {
      if (id) {
        return await this.model.findAll({ where: { id: id } });
      } else {
        return await this.model.findAll();
      }
    } catch (e) {
        return `Error in reading data with the id: ${id}`;
    }
  }
  async update(id, obj) {
    try {
      const dataById = await this.model.findOne({ where: { id } });
      return await dataById.update(obj);
    } catch (e) {
        console.error(`Error while updating data with id: ${id}`);
    }
  }

  async delete(id) {
    try {
      return await this.model.destroy({ where: { id } });
    } catch (e) {
        console.error(`Error while deleting the data with id: ${id}`);
    }
  }
  async readWithComments(Comments, id) {
    try {
      if (id) {
        return await this.model.findOne({
          include: [Comments],
          where: { id: id },
        });
      } else {
        console.log("No id provided");
        return await this.model.findAll({ include: [Comments] });
      }
    } catch (e) {
        console.error(
        `Error while reading the Comments for model ${this.model.name}`
      );
    }
  }
}

module.exports = postCommentsRoutes;
