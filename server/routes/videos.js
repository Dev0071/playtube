import express from 'express';
import {
  addVideo,
  deleteVideo,
  getByTag,
  getVideo,
  randomVideo,
  search,
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

router.get('/trend', trend);
router.get('/tags', getByTag);
router.get('/search', search);

router.get('/random', randomVideo);

router.get('/sub', verifyToken, subscribed);

export default router;
