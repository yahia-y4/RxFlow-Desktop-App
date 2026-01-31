const express = require('express');
const appSettingsRouter = express.Router();
const authMiddleware = require("../middlewares/auth.js");
const {
    getAppSettings,
    updateAppSettings,
    calculation_Average_Sales,
    calculation_Receivables_Average,
    calculation_Debts_Average,
    getFrontAppSettings,

} = require('../controllers/appSettingsConroller')
appSettingsRouter.get('/getAppSettings',getAppSettings)
appSettingsRouter.put('/updateAppSettings',updateAppSettings)
appSettingsRouter.put('/calculation_Average_Sales',authMiddleware,calculation_Average_Sales)
appSettingsRouter.put('/calculation_Receivables_Average',authMiddleware,calculation_Receivables_Average)
appSettingsRouter.put('/calculation_Debts_Average',authMiddleware,calculation_Debts_Average)
appSettingsRouter.get('/getFrontAppSettings',getFrontAppSettings)



module.exports = appSettingsRouter