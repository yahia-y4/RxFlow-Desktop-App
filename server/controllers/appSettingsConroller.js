
const fs = require('fs')
const path = require('path')
const { ItemSalesSummary, warehouse, customer } = require('../models')
const appSettingsPath = path.join(__dirname, '..', 'config', 'appSettings.json')

let appSettingsData = {}
const loadSettings = () => {
    return JSON.parse(fs.readFileSync(appSettingsPath))
}
try {
    appSettingsData = loadSettings()

} catch (e) {
    console.log(e)
}
const createAppSettings_file = async () => {
    try {
        if (!fs.existsSync(appSettingsPath)) {
            const data = {
    "unit_settings": {
        "forms": [
            "حب",
            "كبسول",
            "شراب",
            "معلق",
            "محلول",
            "قطرة",
            "مرهم",
            "كريم",
            "جل",
            "تحميلة",
            "أمبولة",
            "بخاخ",
            "لصقة"
        ],
        "concent_units": [
            "mg/mL",
            "mg/5mL",
            "µg/mL",
            "IU/mL",
            "mg/tablet",
            "mg/capsule",
            "mg/suppository",
            "mg/patch",
            "mg/g",
            "%",
            "µg/spray",
            "mg/drop",
            "IU/drop"
        ],
        "titer_units": [
            "mg/tablet",
            "g/tablet",
            "µg/tablet",
            "mg/capsule",
            "g/capsule",
            "µg/capsule",
            "mg/suppository",
            "g/suppository",
            "mg/patch",
            "µg/patch",
            "µg/h/patch",
            "µg/puff",
            "mg/puff"
        ],
        "package_units": [
            "علبة",
            "شريط",
            "زجاجة",
            "أمبولة",
            "أنبوب",
            "قنينة",
            "كيس",
            "عبوة"
        ]
    },
    "currency_Settings": {
        "current_Currency": {
            "name": "دولار امريكي",
            "symbol": "$"
        },
        "currencies": [
            {
                "name": "دولار امريكي",
                "symbol": "$"
            },
            {
                "name": "يورو",
                "symbol": "€"
            },
            {
                "name": "ليرة تركي",
                "symbol": "₺"
            },
            {
                "name": "ليرة سوري",
                "symbol": "SR"
            }
        ],
        "conversion_rate": 1
    },
    "Drug_Statistics_Settings": {
        "Default_Zero_Quantity": 3,
        "Expiry_warning_before": 7,
        "Minimum_Quantity_Level": 5,
        "Maximum_Quantity_Level": 35,
        "Average_Sales": 0,
        "getting_limit": 10
    },
    "Supplier_Statistics_Settings": {
        "Receivables_Average": 0,
        "getting_limit": 10
    },
    "Customer_Settings": {
        "getting_limit": 10,
        "Debts_Average": 0
    },
    "Notices_Settings": {
        "Expiry_Notices": false,
        "Low_Stock_Quantity_Notices": true,
        "Notification_of_reaching_true_zero": true,
        "Add_medication_Notices": false,
        "Delete_medication_Notices": true,
        "Add_supplier_Notices": true,
        "Update_supplier_Notices": true,
        "Delete_supplier_Notices": true,
        "payment_supplier_Notices": true,
        "Add_customer_Notices": true,
        "Add_debt_customer_Notices": true,
        "Update_customer_Notices": true,
        "Delete_customer_Notices": true,
        "Receive_payment_customer_Notices": true
    }
}
            fs.writeFileSync(appSettingsPath, JSON.stringify(data))
            appSettingsData = data
        } else {
            console.log("appSettings file already exists")
            appSettingsData = JSON.parse(fs.readFileSync(appSettingsPath))
        }
    } catch (error) {
        console.log(error)
    }

}
const getAppSettings = async (req, res) => {
    try {
        return res.status(200).json(appSettingsData)
    } catch (error) {
        return res.status(500).json({
            Error: error.message,
        });
    }
}
const getFrontAppSettings= async(req,res)=>{
    try {
        
        return res.status(200).json({
            unit_settings: appSettingsData.unit_settings,
            currency_Settings: appSettingsData.currency_Settings,
        })
    } catch (error) {
        return res.status(500).json({
            Error: error.message,
        });
    }
}
const updateAppSettings = async (req, res) => {
    try {

        const { data } = req.body
        appSettingsData = data
        fs.writeFileSync(appSettingsPath, JSON.stringify(data))
        return res.status(200).json({
            message: "appSettings updated successfully",
        })
    } catch (error) {
        return res.status(500).json({
            Error: error.message,
        });
    }
}
const calculation_Average_Sales = async (req, res) => {
    try {
        const userId = req.user.id;
        const itemSalesSummaries = await ItemSalesSummary.findAll({
            where: {
                userId,
            },
        })
        let totalSales = 0
        itemSalesSummaries.forEach(item => {
            totalSales += item.sales
        })
        const averageSales = totalSales / itemSalesSummaries.length
        appSettingsData.Drug_Statistics_Settings.Average_Sales = averageSales
        fs.writeFileSync(appSettingsPath, JSON.stringify(appSettingsData))
        return res.status(200).json({
            message: "Average Sales updated successfully",
        })
    } catch (error) {
        return res.status(500).json({
            Error: error.message,
        });
    }
}
const calculation_Receivables_Average = async (req, res) => {
    try {
        const userId = req.user.id;
        const warehouses = await warehouse.findAll({
            where: {
                userId,
            },
        })
        let totalReceivables = 0
        warehouses.forEach(warehouse => {
            totalReceivables += warehouse.payable_amount
        })
        const averageReceivables = totalReceivables / warehouses.length
        appSettingsData.Supplier_Statistics_Settings.Receivables_Average = averageReceivables || 0
        fs.writeFileSync(appSettingsPath, JSON.stringify(appSettingsData))
        appSettingsData = JSON.parse(fs.readFileSync(appSettingsPath))
        return res.status(200).json({
            message: "Receivables Average updated successfully",
            avg: averageReceivables
        })
    } catch (error) {
        return res.status(500).json({
            Error: error.message,
        });
    }
}
const calculation_Debts_Average = async (req, res) => {
    try {
        const userId = req.user.id;
        const customers = await customer.findAll({
            where: {
                userId,
            },
        })
        if (!customers || customers.length === 0) {
            return res.status(400).json({
                Error: "No customers found",
            })
        }
        let totalDebts = 0
        customers.forEach(customer => {
            totalDebts += customer.debts
        })
        const averageDebts = totalDebts / customers.length
        appSettingsData.Customer_Settings.Debts_Average = averageDebts || 0
        fs.writeFileSync(appSettingsPath, JSON.stringify(appSettingsData))
        return res.status(200).json({
            message: "Debts Average updated successfully",
            avg: appSettingsData.Customer_Settings.Debts_Average 
        })
    } catch (error) {
        return res.status(500).json({
            Error: error.message,
        });
    }
}

module.exports = {
    loadSettings,
    createAppSettings_file,
    getAppSettings,
    updateAppSettings,
    calculation_Average_Sales,
    calculation_Receivables_Average,
    calculation_Debts_Average,
    getFrontAppSettings
}