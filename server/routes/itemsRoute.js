const exprss = require("express");
const itemsRouter = exprss.Router();
module.exports = itemsRouter;

const itemsController = require("../controllers/itemsController.js");
const authMiddleware = require("../middlewares/auth.js");

itemsRouter.post("/add", authMiddleware, itemsController.createItem);
itemsRouter.put("/update/:id", authMiddleware, itemsController.updateItem);
itemsRouter.delete("/delete/:id", authMiddleware, itemsController.delItem);
itemsRouter.get("/getOne/:id", authMiddleware, itemsController.getOneItem);
itemsRouter.get("/getAll", authMiddleware, itemsController.getAllItems);
itemsRouter.post("/sell", authMiddleware, itemsController.sellItems);

//----------------------
