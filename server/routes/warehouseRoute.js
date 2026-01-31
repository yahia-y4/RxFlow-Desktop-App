const express = require("express");
const warehouseRouter = express.Router();
module.exports = warehouseRouter;

const {createWarehouse, updateWarehouse, getWarehouses, getWarehouseById, deleteWarehouse,sendPayment,getPaymentSentHistory,getPaymentSentHistory_one_warehouse} = require("../controllers/warehousesController.js");
const authMiddleware = require("../middlewares/auth.js");
warehouseRouter.get("/getById/:id", authMiddleware, getWarehouseById);

warehouseRouter.post("/create", authMiddleware, createWarehouse);
warehouseRouter.put("/update/:id", authMiddleware, updateWarehouse);
warehouseRouter.get("/getAll", authMiddleware, getWarehouses);
warehouseRouter.get("/getPaymentSentHistory_one_warehouse/:id", authMiddleware, getPaymentSentHistory_one_warehouse);
warehouseRouter.delete("/delete/:id", authMiddleware, deleteWarehouse);
warehouseRouter.post("/sendPayment/:id", authMiddleware, sendPayment);
warehouseRouter.get("/getPaymentSentHistory", authMiddleware, getPaymentSentHistory);
