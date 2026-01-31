const {Invoice, ItemManyInvoice, Item,warehouse} = require("../models/index.js");
const sequelize = require("../db.js");
const createPurchaseInvoice = async (req, res) => {
  let t;

  try {
    t = await sequelize.transaction();

    /* ================== بيانات الطلب ================== */
    const userId = req.user.id;
    const { items, warehouseId, paid_amount, note } = req.body;

    /* ================== تحقق أساسي ================== */
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Invalid items data");
    }

    if (warehouseId == null || paid_amount == null) {
      throw new Error("Invalid invoice data");
    }

    /* ================== حساب الإجمالي ================== */
    let total_price = 0;
    for (const item of items) {
      total_price += item.price * item.quantity;
    }

    /* ================== حالة الدفع ================== */
    let payment_status = "complete";

    if (total_price != paid_amount) {
      payment_status = "partial";

      const _warehouse = await warehouse.findByPk(warehouseId, {
        transaction: t,
      });

      if (!_warehouse) {
        throw new Error("Warehouse not found");
      }

      _warehouse.payable_amount += total_price - paid_amount;
      await _warehouse.save({ transaction: t });
    }

    /* ================== إنشاء الفاتورة ================== */
    const newPurchaseInvoice = await Invoice.create(
      {
        userId,
        warehouseId,
        total_price,
        paid_amount,
        payment_status,
        note,
      },
      { transaction: t }
    );

    /* ================== تحديث المخزون ================== */
    await Promise.all(
      items.map(async (item) => {
        const _item = await Item.findByPk(item.id, {
          transaction: t,
        });

        if (!_item) {
          throw new Error(`Item not found: ${item.id}`);
        }

        _item.quantity += item.quantity;
        await _item.save({ transaction: t });
      })
    );

    /* ================== جدول الربط ================== */
    await ItemManyInvoice.bulkCreate(
      items.map((item) => ({
        itemId: item.id,
        invoiceId: newPurchaseInvoice.id,
        quantity: item.quantity,
        price: item.price,
      })),
      { transaction: t }
    );

    /* ================== تأكيد العملية ================== */
    await t.commit();

    res.status(201).json({
      message: "Purchase invoice created successfully",
      newPurchaseInvoice,
    });
  } catch (error) {
    if (t) await t.rollback();

    console.error(error);

    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const getPurchaseInvoices = async (req, res) => {
    try {
        const userId = req.user.id;

        const purchaseInvoices = await Invoice.findAll({
            where: {
                userId: userId
            },include:[
                {
                    model:warehouse,
                    attributes:["id","name","warehouse_name"]
                },{
                    model:Item,
                    attributes:["id","name","company","form","code"]
                    ,through:{attributes:["quantity","price"]}
                }
            ]
           

        });
        res.status(200).json(purchaseInvoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}
const getPurchaseInvoiceById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
      const _Invoice = await Invoice.findOne({where:{userId,id},include:[
        {
            model:warehouse,
            attributes:["id","name","phone_number","location","warehouse_name"]

        },{
            model:Item,
            through:{
                attributes:["quantity","price"]
            },
            attributes:["id","name","company","form","code"]

        }
      ]})
        res.status(200).json(_Invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}
const deletePurchaseInvoice = async (req,res) =>{
    try{
const userId = req.user.id;
const {id} = req.params;
const _Invoice = await Invoice.findOne({where:{userId,id}});
if(!_Invoice) {
    throw new Error("Invoice not found");
}
const _warehouse = await warehouse.findByPk(_Invoice.warehouseId);
if(_warehouse.payable_amount > _warehouse.paid_amount) {
    throw new Error("can not del this invoice because the warehouse has payable_amount");
}
await _Invoice.destroy();
    }catch(error){
       
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}
module.exports = {
    createPurchaseInvoice,
    getPurchaseInvoices,
    getPurchaseInvoiceById,
    deletePurchaseInvoice
};