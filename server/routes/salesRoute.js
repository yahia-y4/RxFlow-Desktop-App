const express = require("express");
const salesRouter = express.Router();
module.exports = salesRouter;
const {getAllSalesRecords} = require("../controllers/salesRecordsController.js")
const authMiddleware = require("../middlewares/auth.js");

salesRouter.get("/getAll", authMiddleware, getAllSalesRecords);