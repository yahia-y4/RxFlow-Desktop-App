const { SalesRecord, ItemManySalesRecord,Item } = require("../models");

const createSalesRecord = async ( userId, items, t) => {
  const salesRecord = await SalesRecord.create(
    { userId },
    { transaction: t }
  );


  await Promise.all(
    items.map(async (item) => {
     
      await ItemManySalesRecord.create(
        {
          itemId: item.id,
          salesRecordId: salesRecord.id,
          quantity: item.quantity,
            price: item.salePrice,
        },
        { transaction: t }
      );
    })
  );

  return salesRecord;
};

const getAllSalesRecords = async (req, res) => {
  const userId = req.user.id;
    try {
    const salesRecords = await SalesRecord.findAll({ where: { userId },include:[
        {
            model: Item,
            through: {
                attributes: ['quantity', 'price']
            },
            attributes: ['id', 'name', 'company', 'form', 'code']
        }
    ] });
    res.status(200).json(salesRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  createSalesRecord,
  getAllSalesRecords
};


