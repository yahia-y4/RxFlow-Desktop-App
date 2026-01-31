const { Item, ItemSalesSummary ,warehouse,customer} = require('../models')
const { Op, literal ,fn} = require('sequelize');
const { loadSettings } = require('./appSettingsConroller.js')

// الععناصر
const TopSellingBySales = async (req, res) => {
    try {
        const appSettingsData = loadSettings()
        const userId = req.user.id;
        const best_selling = await ItemSalesSummary.findAll({
            where: {
                userId,
                sales: { [Op.gt]: appSettingsData.Drug_Statistics_Settings.Average_Sales }
            },
            include: [{
                model: Item,
                
            }],
            order: [['sales', 'DESC']],
            limit: appSettingsData.Drug_Statistics_Settings.getting_limit,
        })
        res.json(best_selling)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const lowSellingBySales = async (req, res) => {
    try {
        const appSettingsData = loadSettings()
        const userId = req.user.id;
        const best_selling = await ItemSalesSummary.findAll({
            where: {
                userId,
                sales: { [Op.lte]: appSettingsData.Drug_Statistics_Settings.Average_Sales }

            },
            include: [{
                model: Item,}],
            order: [['sales', 'ASC']],
            limit: appSettingsData.Drug_Statistics_Settings.getting_limit,
        })
        res.json(best_selling)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const lowQuantity_items = async (req, res) => {
    try {
        const appSettingsData = loadSettings()
        const userId = req.user.id;
        const low = await Item.findAll({
            where: {
                userId,
                quantity: { [Op.lte]: appSettingsData.Drug_Statistics_Settings.Minimum_Quantity_Level }
            }, attributes: ['id', 'name', 'company', 'form', 'quantity', 'code']
        })
        res.status(200).json(low)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const highQuantity_items = async (req, res) => {
    try {
        const appSettingsData = loadSettings()
        const userId = req.user.id;
        const high = await Item.findAll({
            where: {
                userId,
                quantity: { [Op.gte]: appSettingsData.Drug_Statistics_Settings.Maximum_Quantity_Level }
            }, attributes: ['id', 'name', 'company', 'form', 'quantity', 'code']
        })
        res.status(200).json(high)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const Default_Zero_Quantity_items = async (req, res) => {
    try {
        const appSettingsData = loadSettings()
        const userId = req.user.id;
        const items = await Item.findAll({
            where: {
                userId,
                quantity: { [Op.eq]: appSettingsData.Drug_Statistics_Settings.Default_Zero_Quantity }
            }, attributes: ['id', 'name', 'company', 'form', 'quantity', 'code']
        })
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const true_Zero_Quantity_items = async (req, res) => {
    try {
       
        const userId = req.user.id;
        const items = await Item.findAll({
            where: {
                userId,
                quantity: { [Op.eq]: 0 }
            }, attributes: ['id', 'name', 'company', 'form', 'quantity', 'code']
        })
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const getExpiredItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await Item.findAll({
            where: {
                userId,
                expiry_date: { [Op.lte]: new Date() }
            }, attributes: ['id', 'name', 'company', 'form', 'quantity', 'code', 'expiry_date']
        })
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const getNearExpiryItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(today.getMonth() + 1);

        const items = await Item.findAll({
            where: {
                userId,
                expiry_date: {
                    [Op.gt]: today,
                    [Op.lte]: nextMonth
                }
            },
            attributes: ["id", "name", "company", "form", "quantity", "code", "expiry_date"],
            order: [["expiry_date", "ASC"]]
        });

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllstatistics_items = async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await ItemSalesSummary.findAll({
            order: [['sales', 'DESC']],
            where: {
                userId,
            }, include: {
                model: Item,
                attributes: ['name', 'company', 'form']
            }
        })
        res.json(items)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const GeneralStatistics_items = async (req, res) => {
  try {
    const userId = req.user.id;

    const [inStorage] = await Item.findAll({
      where: { userId },
      attributes: [
        [fn("SUM", literal("price * quantity")), "total_price_in_storage"],
        [fn("SUM", literal("profit * quantity * price")), "total_profit_in_storage"],
        [fn("SUM", literal("quantity")), "total_quantity_in_storage"],
        [fn("COUNT", literal("id")), "total_items_in_storage"]
      ],
      raw: true
    });

    const [outStorage] = await ItemSalesSummary.findAll({
      where: { userId },
      attributes: [
        [fn("SUM", literal("sales")), "total_out_sell_price"],
        [fn("SUM", literal("profit")), "total_out_profit"],
        [fn("SUM", literal("quantity")), "total_out_quantity"]
      ],
      raw: true
    });
    const total_sell_price_in_storage = ((+inStorage.total_price_in_storage ) + (+inStorage.total_profit_in_storage)) || 0;

    res.status(200).json({
      ...inStorage,
      total_sell_price_in_storage,
      ...outStorage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// الموردين

const highReceivablesSuppliers = async (req, res) => {
  try {
    const appSettingsData = loadSettings()
    const userId = req.user.id;

    const high = await warehouse.findAll({
      where: {
        userId,
        payable_amount:{ [Op.gte]: appSettingsData.Supplier_Statistics_Settings.Receivables_Average}
      },
      attributes: ['id', 'name','warehouse_name','payable_amount', 'paid_amount']
    });

    res.status(200).json({high,avg:appSettingsData.Supplier_Statistics_Settings.Receivables_Average});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const lowReceivablesSuppliers = async (req, res) => {
  try {
    const appSettingsData = loadSettings()
    const userId = req.user.id;

    const low = await warehouse.findAll({
      where: {
        userId,
        payable_amount:{ [Op.lte]: appSettingsData.Supplier_Statistics_Settings.Receivables_Average}
      },
      attributes: ['id', 'name','warehouse_name','payable_amount', 'paid_amount']
    });

    res.status(200).json(low);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const zeroReceivablesSuppliers = async (req, res) => {
  try {
    const userId = req.user.id;

    const zero = await warehouse.findAll({
      where: {
        userId,
        payable_amount:{ [Op.eq]: 0}
      },
      attributes: ['id', 'name','warehouse_name','payable_amount', 'paid_amount']
    });

    res.status(200).json(zero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GeneralStatistics_Suppliers= async(req,res)=>{
    try {
        const userId = req.user.id;
        const total_payable_amount = await warehouse.sum('payable_amount',{where:{userId}})
        const total_count_Suppliers = await warehouse.count({where:{userId}})
        const count_Suppliers_with_payable_amount = await warehouse.count({where:{userId,payable_amount:{[Op.gt]:0}}})
        const count_Suppliers_without_payable_amount = total_count_Suppliers - count_Suppliers_with_payable_amount

        res.status(200).json({
            total_payable_amount,
            total_count_Suppliers,
            count_Suppliers_with_payable_amount,
            count_Suppliers_without_payable_amount
        })
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

const highDebtsCustomers = async (req, res) => {
  try {
    const appSettingsData = loadSettings()
    const userId = req.user.id;

    const high = await customer.findAll({
      where: {
        userId,
        debts:{ [Op.gte]: appSettingsData.Customer_Settings.Debts_Average}
      },
      attributes: ['id', 'name','phone_number','debts']
    });
    if (!high || high.length === 0) {
      return res.status(400).json({
        Error: "No high debts customers found",
      })
    }

    res.status(200).json({high,avg:appSettingsData.Customer_Settings.Debts_Average});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const lowDebtsCustomers = async (req, res) => {
  try {
    const appSettingsData = loadSettings()
    const userId = req.user.id;

    const low = await customer.findAll({
      where: {
        userId,
        debts:{ [Op.lte]: appSettingsData.Customer_Settings.Debts_Average}
      },
      attributes: ['id', 'name','phone_number','debts']
    });
    if (!low || low.length === 0) {
      return res.status(400).json({
        Error: "No low debts customers found",
      })
    }

    res.status(200).json({low,avg:appSettingsData.Customer_Settings.Debts_Average});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const zeroDebtsCustomers = async (req, res) => {
  try {
    const userId = req.user.id;

    const zero = await customer.findAll({
      where: {
        userId,
        debts:{ [Op.eq]: 0}
      },
      attributes: ['id', 'name','phone_number','debts']
    });
    if (!zero || zero.length === 0) {
      return res.status(400).json({
        Error: "No zero debts customers found",
      })
    }

    res.status(200).json(zero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const GeneralStatistics_Customers= async(req,res)=>{
    try {
        const userId = req.user.id;
        const total_debts = await customer.sum('debts',{where:{userId}})
        const total_count_Customers = await customer.count({where:{userId}})
        const count_Customers_with_debts = await customer.count({where:{userId,debts:{[Op.gt]:0}}})
        const count_Customers_without_debts = total_count_Customers - count_Customers_with_debts

        res.status(200).json({
            total_debts,
            total_count_Customers,
            count_Customers_with_debts,
            count_Customers_without_debts
        })
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

const GeneralStatistics = async(req,res)=>{
 
    try {

      const userId = req.user.id;
      const total_profit = await ItemSalesSummary.sum('profit',{where:{userId}}) || 0
      const total_payable_amount = await warehouse.sum('payable_amount',{where:{userId}}) || 0
      const total_debts = await customer.sum('debts',{where:{userId}}) || 0
      const profit_with_payable_amount = total_profit  - total_payable_amount
      const profit_with_debts = total_profit + total_debts
      const final_profit = total_profit - total_payable_amount + total_debts


      res.status(200).json({
        total_profit,
        total_payable_amount,
        total_debts,
        profit_with_payable_amount,
        profit_with_debts,
        final_profit
      })
    }catch(error){
      res.status(500).json({ error: error.message });
    }
  
}

module.exports = {
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
}
