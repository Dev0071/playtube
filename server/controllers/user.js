import { creatError } from '../error.js';
import User from '../models/User.js';

// update a user
export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(creatError(403, 'you can only update your account'));
  }
};

//delete a user
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json('user has been deleted');
    } catch (err) {
      next(err);
    }
  } else {
    return next(creatError(403, 'you can only delete your account'));
  }
};

// get a user
export const getUser = async (req, res, next) => {
  try {
    const user = User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findById(req.params.id, {
      $push: { subscribedUser: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json('Subscription successful');
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findById(req.params.id, {
      $pull: { subscribedUser: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json('Unsubscription successful');
  } catch (error) {
    next(error);
  }
};
