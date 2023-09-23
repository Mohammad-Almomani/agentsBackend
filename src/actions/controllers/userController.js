"use strict";
const bcrypt = require("bcrypt");
const base64 = require("base-64");

const { Users, commentModel } = require("../../models/index");

// create a new user
const signup = async (req, res) => {
  try {
    const { username, email, password, role, phonenumber } = req.body;
    const data = {
      username: username,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: role,
      phonenumber: phonenumber,
    };
    const newUser = await Users.create(data);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

// login user, check if user exists, check if password is correct

const login = async (req, res) => {
  try {
    // check if the user sent the authorization header
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

    // if (!user) {
    //   user = await Users.findOne({
    //     where: {
    //       username: email,
    //     },
    //   });
    // }

    if (user) {
      // check if the password is correct
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


// get all users, for testing only
const allUser = async (req, res) => {
  const users = await Users.findAll({ include: [commentModel] });
  return res.json(users);
};

// get one user, for testing only
const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await Users.findOne({
    include: [commentModel],
    where: { id: id },
  });
  return res.status(200).json(user);
};

// delete user, for testing only
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await Users.destroy({ where: { id: id } });
  return res.status(204).send("deleted");
};

// get user profile, for refreshing the token
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

// update user cart, for adding and removing items from cart and favorites
const updateCart = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.user.id,
      },
    });
    await user.update(req.body);
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
  updateCart
};
