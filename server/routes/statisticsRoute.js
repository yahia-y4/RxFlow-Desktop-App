const express = require('express');
const statisticsRouter = express.Router();
const authMiddleware = require("../middlewares/auth.js");
const {
    TopSellingBySales,
    getAllstatistics_items,
    lowSellingBySales,
    lowQuantity_items,
    highQuantity_items,
    Default_Zero_Quantity_items,
    true_Zero_Quantity_items,
    getExpiredItems,
    getNearExpiryItems,
    GeneralStatistics_items,
    highReceivablesSuppliers,
    lowReceivablesSuppliers,
    zeroReceivablesSuppliers,
    GeneralStatistics_Suppliers,
    highDebtsCustomers,
    lowDebtsCustomers,
    zeroDebtsCustomers,
    GeneralStatistics_Customers,
    GeneralStatistics

} = require('../controllers/statisticsController.js')
statisticsRouter.get('/TopSellingBySales',authMiddleware,TopSellingBySales)
statisticsRouter.get('/getAllstatistics_items',authMiddleware,getAllstatistics_items)
statisticsRouter.get('/lowSellingBySales',authMiddleware,lowSellingBySales)
statisticsRouter.get('/highQuantity_items',authMiddleware,highQuantity_items)
statisticsRouter.get('/lowQuantity_items',authMiddleware,lowQuantity_items)
statisticsRouter.get('/Default_Zero_Quantity_items',authMiddleware,Default_Zero_Quantity_items)
statisticsRouter.get('/true_Zero_Quantity_items',authMiddleware,true_Zero_Quantity_items)
statisticsRouter.get('/getExpiredItems',authMiddleware,getExpiredItems)
statisticsRouter.get('/getNearExpiryItems',authMiddleware,getNearExpiryItems)
statisticsRouter.get('/GeneralStatistics_items',authMiddleware,GeneralStatistics_items)
statisticsRouter.get('/highReceivablesSuppliers',authMiddleware,highReceivablesSuppliers)
statisticsRouter.get('/lowReceivablesSuppliers',authMiddleware,lowReceivablesSuppliers)
statisticsRouter.get('/zeroReceivablesSuppliers',authMiddleware,zeroReceivablesSuppliers)
statisticsRouter.get('/GeneralStatistics_Suppliers',authMiddleware,GeneralStatistics_Suppliers)
statisticsRouter.get('/highDebtsCustomers',authMiddleware,highDebtsCustomers)
statisticsRouter.get('/lowDebtsCustomers',authMiddleware,lowDebtsCustomers)
statisticsRouter.get('/zeroDebtsCustomers',authMiddleware,zeroDebtsCustomers)
statisticsRouter.get('/GeneralStatistics_Customers',authMiddleware,GeneralStatistics_Customers)
statisticsRouter.get('/GeneralStatistics',authMiddleware,GeneralStatistics)



module.exports = statisticsRouter;
