const express = require('express');
const customerRouter = express.Router();
const authMiddleware = require("../middlewares/auth.js");
const {createCustomer,getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    addDebt,
    ReceivePayment,
    getAllAddedDebt_Payment,
    getAllReceive_Payment,
    get_one_customers_AddedDebt_Payment,
    get_one_customer_Receive_Payment

} = require('../controllers/customersController.js');



customerRouter.post('/create',authMiddleware, createCustomer);
customerRouter.get('/getAll',authMiddleware,getCustomers);
customerRouter.get('/getOne/:id',authMiddleware,getCustomerById);
customerRouter.put('/update/:id',authMiddleware,updateCustomer);
customerRouter.delete('/delete/:id',authMiddleware,deleteCustomer);
customerRouter.post('/addDebt/:id',authMiddleware,addDebt);
customerRouter.post('/ReceivePayment/:id',authMiddleware,ReceivePayment);
customerRouter.get('/getAllAddedDebt_Payment',authMiddleware,getAllAddedDebt_Payment)
customerRouter.get('/getAllReceive_Payment',authMiddleware,getAllReceive_Payment)
customerRouter.get('/getAddedDebt_Payment/:id',authMiddleware,get_one_customers_AddedDebt_Payment)
customerRouter.get('/getReceive_Payment/:id',authMiddleware,get_one_customer_Receive_Payment)


module.exports = customerRouter;