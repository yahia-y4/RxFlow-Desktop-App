const express = require('express');
const noticeRouter = express.Router();
const {getNotices} = require('../controllers/noticeController');
const authMiddleware = require('../middlewares/auth.js');

noticeRouter.get('/getNotices',authMiddleware,getNotices);

module.exports= noticeRouter;


