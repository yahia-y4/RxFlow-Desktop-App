const express = require("express");
const purchaseInvoiceRouter = express.Router();
const {createPurchaseInvoice,getPurchaseInvoices,getPurchaseInvoiceById,deletePurchaseInvoice} = require("../controllers/purchaseInvoicesController.js");
const authMiddleware = require("../middlewares/auth.js");



purchaseInvoiceRouter.post("/create", authMiddleware, createPurchaseInvoice);
purchaseInvoiceRouter.get("/getAll", authMiddleware, getPurchaseInvoices);
purchaseInvoiceRouter.get("/getById/:id", authMiddleware, getPurchaseInvoiceById);
purchaseInvoiceRouter.delete("/delete/:id", authMiddleware, deletePurchaseInvoice);

module.exports = purchaseInvoiceRouter;
