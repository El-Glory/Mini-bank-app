import statusCodes from "../helpers/statusCodes";
import mongoose from "mongoose";
import utils from "../helpers/common";
const {
  signupValidation,
  loginValidation,
} = require("../middleware/validations");
const User = require("../models/user-model");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

class UserController {
  static async signup(req, res) {
    const { error } = signupValidation(req.body);
    if (error)
      return res.status(400).json({
        status: statusCodes.badRequest,
        error: error.details[0].message,
      });

    try {
      const { firstName, lastName, email, password, type } = req.body;

      let userType = "client";
      let adminType = false;

      if (type) {
        userType = type;
        if (userType === "admin") {
          adminType = true;
          userType = "staff";
        }
      }

      const emailExist = await User.findOne({ email: req.body.email });
      //console.log(email);
      if (emailExist)
        return res.status(400).send({
          status: statusCodes.badRequest,
          error: "Email already exists",
        });

      const user = new User({
        email,
        firstName,
        lastName,
        password: utils.hashPassword(password),
        type: userType,
        isAdmin: adminType,
      });

      console.log("alert");

      user.save();
      res.status(201).send({ status: statusCodes.created, user });
      console.log(user);
    } catch (error) {
      return res
        .status(500)
        .json({ status: statusCodes.serverError, error: "Server Error" });
    }
  }

  //USER SIGNIN
  static async signIn(req, res) {
    const { error } = loginValidation(req.body);
    if (error)
      return res.status(400).json({
        status: statusCodes.badRequest,
        error: error.details[0].message,
      });
    const { email, password } = req.body;

    await User.findOne({ email: req.body.email }).then((user) => {
      //if user not exist than return status 400
      if (!user)
        return res.status(400).json({
          status: statusCodes.badRequest,
          error: "email or password incorrect",
        });

      //if user exist than compare password
      //password comes from the user
      //user.password comes from the database
      bcrypt.compare(password, user.password, (err, data) => {
        //if error than throw error
        if (err) throw err;

        //Create and assign a token
        const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
        res.header("auth-token", token);
        const { firstName, lastName, email, id } = user;

        if (data) {
          return res.status(200).json({
            status: statusCodes.success,
            user: [
              {
                token,
                id,
                firstName,
                lastName,
                email,
              },
            ],
          });
        } else {
          return res.status(401).json({
            status: statusCodes.unAuthorized,
            error: "email or password incorrect",
          });
        }
      });
    });
  }
}

export default UserController;
