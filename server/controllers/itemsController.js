const sequelize = require("../db");
const { Item, ItemSalesSummary } = require("../models");
const { createSalesRecord } = require("./salesRecordsController");
const { createNotice } = require("./noticeController.js");
const { loadSettings } = require("./appSettingsConroller.js");
const { Op } = require("sequelize"); 
const createItem = async (req, res) => {
  const appSettingsData = loadSettings();
  const userId = req.user.id;

  const {
    name,
    company,
    form,
    concent,
    concent_unit,
    package_type,
    quantity,
    price,
    profit,
    code,
    expiry_date,
  } = req.body;

  try {
    const existingItem = await Item.findOne({ where: { code, userId } });
    
    let newItem;

    if (!existingItem) {
      newItem = await Item.create({
        name,
        company,
        form,
        concent,
        concent_unit,
        package_type,
        quantity,
        price,
        profit,
        code,
        expiry_date,
        userId,
      });

      await ItemSalesSummary.create({
        itemId: newItem.id,
        userId,
        quantity: 0,
        sales: 0,
        profit: 0,
      });

    } else if (existingItem.isDeleted) {
      newItem = await existingItem.update({
        isDeleted: false,
        quantity,
      });
    } else {
      throw new Error("خطأ، هذا الدواء موجود مسبقاً، قم بزيادته بإضافة فاتورة");
    }

    if (appSettingsData.Notices_Settings.Add_medication_Notices) {
      const title = "اضافة دواء للمخزون";
      const content = " للمخزون بنجاح (" + company + ") " + name + " تمت اضافة الدواء ";
      createNotice(userId, title, content);
    }

    const itemData = newItem.get({ plain: true });

    res.status(201).json({
      message: "Item created successfully",
      success: true,
      data: {
        ...itemData,
        sell_price: +itemData.price + +itemData.profit,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || "Internal server error" });
  }
};
const searchItems = async (req, res) => {
  const userId = req.user.id;
  const searchValue = req.body.searchValue;

  try {
    const items = await Item.findAll({
      where: {
        userId,
        isDeleted: false,
        [Op.or]: [
          { name:    { [Op.like]: `%${searchValue}%` } },
          { company: { [Op.like]: `%${searchValue}%` } },
          { code:    { [Op.like]: `%${searchValue}%` } },
          { id:      { [Op.eq]: isNaN(searchValue) ? null : Number(searchValue) } },
        ]
      }
    });

    if (!items) {
      return res.status(404).json({ success: false, error: "No items found" }); 
    }

    res.status(200).json(items);

  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;
  const item = await Item.findOne({ where: { id: itemId, userId } });
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  const {
    name,
    company,
    form,
    concent,
    concent_unit,
    package_type,
    quantity,
    price,
    profit,
    code,
    expiry_date,
  } = req.body;

  try {
 await Item.update(
      {
        name,
        company,
        form,
        concent,
        concent_unit,
        package_type,
        quantity,
        price,
        profit,
        code,
        expiry_date,
        isUpdated: true,
      },
      { where: { id: itemId, userId } },
    );

const updetedItem = {
       id: item.id,
        name,
        company,
        form:form,
        quantity:quantity,
        code:code,
        package_type:package_type,
        concent:concent ,
        concent_unit:concent_unit,
        expiry_date:expiry_date,
        createdAt: item.createdAt,
        isDeleted: item.isDeleted,
        isUpdated: item.isUpdated,
        userId: item.userId,
        updatedAt: new Date(),
        price: price,
        profit: profit
}
    res.status(200).json(updetedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const delItem = async (req, res) => {
  const appSettingsData = loadSettings();
  const itemId = req.params.id;
  const userId = req.user.id;
  const item = await Item.findOne({ where: { id: itemId, userId } });
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  try {
    await Item.update(
      {
        isDeleted: true,
        quantity: 0,
      },
      { where: { id: itemId, userId } },
    );
    if (appSettingsData.Notices_Settings.Delete_medication_Notices) {
      const title = "حذف دواء من المخزون";
      const content =
        "من المخزون  (" + item.company + ") " + item.name + " تم حذف الدواء ";
      createNotice(userId, title, content);
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOneItem = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;
  const item = await Item.findOne({
    where: { id: itemId, userId, isDeleted: false },
  });
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.status(200).json(item);
};
const getAllItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const items = await Item.findAll({
      where: { userId, isDeleted: false },
    });

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sellItems = async (req, res) => {
  const appSettingsData = loadSettings();
  const userId = req.user.id;
  const { items } = req.body;

  const t = await sequelize.transaction();

  try {
    for (let i of items) {
      const _item = await Item.findOne({
        where: { id: i.id, userId },
        transaction: t,
      });
      if (!_item) throw new Error(`العنصر ${i.id} غير موجود`);
      if (_item.quantity < i.quantity)
        throw new Error(`الكمية غير متوفرة للعنصر ${_item.name}`);
      if (
        _item.quantity - i.quantity <
        appSettingsData.Drug_Statistics_Settings.Default_Zero_Quantity
      ) {
        throw new Error(
          ` تم بلوغ الحد المسموح  للعنصر  لا يمكن ان يبقى في المستودع عدد قطع اقل من ${appSettingsData.Drug_Statistics_Settings.Default_Zero_Quantity} راجع الاعدادات لتغيير الحد الادنى`,
        );
      }
    }

    await Promise.all(
      items.map(async (i) => {
        const _item = await Item.findOne({
          where: { id: i.id, userId },
          transaction: t,
        });
        _item.quantity -= i.quantity;
        await ItemSalesSummary.increment(
          {
            quantity: i.quantity,
            sales: sequelize.literal(
              `${i.quantity} * (${_item.price}+( ${_item.price} * ${_item.profit}))`,
            ),
            profit: sequelize.literal(
              `${i.quantity} * ${_item.price} * ${_item.profit}`,
            ),
          },
          {
            where: {
              itemId: _item.id,
              userId,
            },
            transaction: t,
          },
        );

        await _item.save({ transaction: t });
        if (appSettingsData.Notices_Settings.Low_Stock_Quantity_Notices) {
          if (
            _item.quantity <=
            appSettingsData.Drug_Statistics_Settings.Minimum_Quantity_Level
          ) {
            const title = "نقص المخزون";
            const content =
              "(" +
              _item.company +
              ") " +
              _item.name +
              "نقص في عدد القطع للدواء";
            createNotice(userId, title, content);
          }
        }
        if (
          appSettingsData.Notices_Settings.Notification_of_reaching_true_zero
        ) {
          if (_item.quantity == 0) {
            const title = "تم الوصول إلى الحد الأدنى";
            const content =
              "(" +
              _item.company +
              ") " +
              _item.name +
              " تم وصول الكمية الى صفر للدواء ";
            createNotice(userId, title, content);
          }
        }
      }),
    );

    await createSalesRecord(userId, items, t);
    await t.commit();
    return res.status(201).json({ message: "تمت عملية البيع بنجاح" });
  } catch (error) {
    await t.rollback();

    return res.status(500).json({ error: error.message || "خطأ في السيرفر" });
  }
};

module.exports = {
  createItem,
  updateItem,
  delItem,
  getAllItems,
  getOneItem,
  sellItems,
  searchItems
};
