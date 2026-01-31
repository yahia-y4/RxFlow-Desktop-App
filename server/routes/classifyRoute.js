const express = require('express');
const classifyRouter = express.Router();
const authMiddleware = require("../middlewares/auth.js");
const {createClassify,addItemsToClassify,getAllClassify,getClassify_Items,deleteClassify,updateClassify,deleteClassify_item} = require('../controllers/classifyController.js')









classifyRouter.post('/create',authMiddleware,createClassify);
classifyRouter.post('/addItems',authMiddleware,addItemsToClassify);
classifyRouter.get('/getAll',authMiddleware,getAllClassify);
classifyRouter.get('/getItems/:id',authMiddleware,getClassify_Items);
classifyRouter.put('/update/:id',authMiddleware,updateClassify);
classifyRouter.delete('/delete/:id',authMiddleware,deleteClassify);
classifyRouter.delete('/deleteItem',authMiddleware,deleteClassify_item);


module.exports = classifyRouter;
