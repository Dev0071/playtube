import { creatError } from '../error.js';
import video from '../models/video.js';
import Video from '../models/video.js';
import User from '../models/User.js';

// add video
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

// delete video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(creatError(404, 'video not found'));
    if (req.user.id === video.userId) {
      await video.findByIdAndDelete(req.params.id);
      res.status(200).json('the video has been deleted');
    } else {
      return next(creatError(404, 'you can only delete  your video'));
    }
  } catch (error) {
    next(error);
  }
};

// update video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(creatError(404, 'video not found'));
    if (req.user.id === video.userId) {
      const updatedVideo = await video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(creatError(404, 'you can only update your video'));
    }
  } catch (error) {
    next(error);
  }
};

// get video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

// update video views video
export const updateViews = async (req, res, next) => {
  try {
    await Video.findByIdAndRemove(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json('viewa incresed by one');
  } catch (error) {
    next(error);
  }
};

export const randomVideo = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const subscribed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const list = Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
