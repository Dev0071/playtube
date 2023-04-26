import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { creatError } from '../error.js';
import Jwt from 'jsonwebtoken';

// sign up controller

export const signup = async (req, res, next) => {
  try {
    // creates a new user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    // save user to mongoDB
    await newUser.save();
    res.status(200).send('user has been created');
  } catch (err) {
    next(err);
  }
};

// sign in controller
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      next(creatError(404, 'user not found'));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      next(creatError(400, 'wrong cridentials'));
    }

    const token = Jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...others } = user._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
