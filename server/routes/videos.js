import express from 'express';
import {
  addVideo,
  deleteVideo,
  getVideo,
  randomVideo,
  subscribed,
  trend,
  updateVideo,
  updateViews,
} from '../controllers/video.js';
import { verifyToken } from '../verifyUser.js';

const router = express.Router();

// create a video
router.post('/', verifyToken, addVideo);

// delete a video
router.delete('/:id', verifyToken, deleteVideo);

// update a video
router.put('/:id', verifyToken, updateVideo);

// get a video
router.get('/find/:id', getVideo);

// updateviews
router.put('/views/:id', updateViews);

router.get('/trend/:id', trend);

router.get('/random/:id', randomVideo);

router.get('/sub/:id', verifyToken, subscribed);

export default router;
