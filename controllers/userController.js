"use strict";
const bcrypt = require("bcrypt");
const base64 = require("base-64");

const { Users, commentModel } = require("../models/index");

const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const data = {
      username: username,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: role,
    };
    const newUser = await Users.create(data);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    if (!req.headers.authorization) return res.status(401).send("Bad Request");
    console.log(req.headers.authorization);
    const encodedHeader = req.headers.authorization.split(" ").pop();
    const [email, password] = base64.decode(encodedHeader).split(":");
    console.log(email, password);

    let user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      user = await Users.findOne({
        where: {
          username: email,
        },
      });
    }

    if (user) {
      const isAuthorized = await bcrypt.compare(password, user.password);

      if (isAuthorized) {
        return res
          .status(200)
          .json(user);
      } else {
        return res.status(401).send("Please Check Your Username and Password");
      }
    } else {
      return res.status(401).send("Please Check Your Username and Password");
    }
  } catch (error) {
    console.log(error);
  }
};


const allUser = async (req, res) => {
  const users = await Users.findAll({ include: [commentModel] });
  return res.json(users);
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await Users.findOne({
    include: [commentModel],
    where: { id: id },
  });
  return res.status(200).json(user);
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await Users.destroy({ where: { id: id } });
  return res.status(204).send("deleted");
};


const getProfile = async (req, res) => {
  console.log(req.url);
  try {
    const user = await Users.findOne({
      where: {
        id: req.user.id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  allUser,
  login,
  deleteUser,
  getUser,
  getProfile: getProfile,
};
