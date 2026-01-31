const exprss = require('express');
const userRouter = exprss.Router();
const authMiddleware = require("../middlewares/auth.js");

module.exports = userRouter;

const userController = require('../controllers/usersController.js');

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/getUserInfo', authMiddleware,userController.getUserInfo);
