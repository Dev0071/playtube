import express from 'express';
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
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
router.put('/views/:id');

router.get('/trend/:id');

router.get('/random/:id');

router.get('/sub/:id');

export default router;
