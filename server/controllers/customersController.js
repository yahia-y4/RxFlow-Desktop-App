const { customer, payment_received, customers_debts } = require("../models");
const sequelize = require("../db.js");
const {createNotice} = require('./noticeController.js')
const {loadSettings} = require('./appSettingsConroller.js')

const createCustomer = async (req, res) => {
  try {
    const appSettingsData = loadSettings()
    const userId = req.user.id;
    const { name, phone_number, location } = req.body;
    const newCustomer = await customer.create({
      name,
      phone_number,
      location,
      userId,
      debts: 0,
    });
    if(appSettingsData.Notices_Settings.Add_customer_Notices){
      const title = "إضافة زبون";
      const content = `تم إضافة الزبون ${name} لقائمة الزبائن`;
      createNotice(userId,title,content)
    }
    res.status(201).json({
      message: "customer created successfully",
      newCustomer,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};
const getCustomers = async (req, res) => {
  try {
    const userId = req.user.id;
    const customers = await customer.findAll({
      where: {
        userId,
      },
      attributes: ["id", "name", "phone_number"],
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};
const getCustomerById = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const _customer = await customer.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!_customer) {
      return res.status(404).json({
        message: "customer not found",
      });
    }
    res.status(200).json(_customer);
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};
const updateCustomer = async (req, res) => {
  try {
    const appSettingsData = loadSettings()
    const userId = req.user.id;
    const id = req.params.id;
    const { name, phone_number, location } = req.body;
    const _customer = await customer.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!_customer) {
      return res.status(404).json({
        message: "customer not found",
      });
    }
    const oldName = _customer.name;
    await _customer.update({
      name,
      phone_number,
      location,
      isUpdated: true,
    });
    if(appSettingsData.Notices_Settings.Update_customer_Notices){
      const title = "تحديث زبون";
      const content = `تم تحديث بيانات الزبون ${oldName}`;
      createNotice(userId,title,content)
    }
    res.status(200).json({
      message: "customer updated successfully",
      _customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};
const deleteCustomer = async (req, res) => {
  try {
    const appSettingsData = loadSettings()
    const userId = req.user.id;
    const id = req.params.id;
    const _customer = await customer.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!_customer) {
      return res.status(404).json({
        message: "customer not found",
      });
    }
    if (_customer.debts > 0) {
      return res.status(404).json({
        message: "can not del becuase debts > 0",
      });
    }
    await _customer.destroy();
    if(appSettingsData.Notices_Settings.Delete_customer_Notices){
      const title = "حذف زبون";
      const content = `تم حذف الزبون ${_customer.name}`;
      createNotice(userId,title,content)
    }
    res.status(200).json({
      message: "customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};
const addDebt = async (req, res) => {
  const tt = await sequelize.transaction();
  try {
    const appSettingsData = loadSettings()
    const userId = req.user.id;
    const id = req.params.id;
    const { amount, note } = req.body;

    // استخدام نفس المعاملة في البحث
    const _customer = await customer.findOne({
      where: { id, userId },
      transaction: tt,
    });

    if (!_customer) {
      throw new Error("customer not found");
    }

    await _customer.update(
      {
        debts: _customer.debts + amount,
      },
      { transaction: tt }
    );

    await customers_debts.create(
      {
        userId,
        customerId: id,
        amount,
        note,
      },
      { transaction: tt }
    );

    await tt.commit();
      if(appSettingsData.Notices_Settings.Add_debt_customer_Notices){
      const title = "إضافة دين";
      const content = `تم إضافة دين ${amount} للزبون ${_customer.name}`;
      createNotice(userId,title,content)
    }
    res.status(200).json({
      message: "Debt added successfully",
    });
  } catch (error) {
    await tt.rollback();
    res.status(500).json({
      error: error.message,
    });
  }
};
const ReceivePayment = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const appSettingsData = loadSettings()
    const userId = req.user.id;
    const id = req.params.id;
    const { amount, note } = req.body;
    const _customer = await customer.findOne({
      where: { id, userId },
      transaction: t,
    });
    if (!_customer) {
      throw new Error("customer not found");
    }
    if (_customer.debts < amount) {
      throw new Error("can not receive payment becuase debts < amount");
    }
    await _customer.update(
      {
        debts: _customer.debts - amount,
      },
      {
        transaction: t,
      }
    );
    await payment_received.create(
      {
        amount,
        note,
        customerId: id,
        userId,
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    if(appSettingsData.Notices_Settings.Receive_payment_customer_Notices){
      const title = " استلام دفعة";
      const content = `تم استلام دفعة ${amount} من الزبون  ${_customer.name}`;
      createNotice(userId,title,content)
    }
    res.status(200).json({
      message: "payment received successfully",
      _customer,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      error: error.message,
    });
  }
};
const getAllAddedDebt_Payment = async (req, res) => {
  try {
    const userId = req.user.id;
    const _customers_debts = await customers_debts.findAll({
      where: { userId },
      include: [
        {
          model: customer,
          attributes: ["id", "name", "phone_number"],
        },
      ],
    });
    if (!_customers_debts) {
      throw new Error("not find customers_debts to this user");
    }
    return res.status(200).json(_customers_debts);
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
    });
  }
};
const getAllReceive_Payment = async (req, res) => {
  try {
    const userId = req.user.id;

    const _payment_received = await payment_received.findAll({
      where: { userId },
      include: [
        {
          model: customer,
          attributes: ["id", "name", "phone_number"],
        },
      ],
    });

    if (!_payment_received) {
      throw new Error("not found");
    }
    return res.status(200).json(_payment_received);
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
    });
  }
};
const get_one_customers_AddedDebt_Payment = async (req,res) =>{
    try{

        const userId = req.user.id
        const customerId = req.params.id;
        const _AddedDebt = await customers_debts.findAll({where:{userId,customerId}})
        if(!_AddedDebt){
             throw new Error("not found")
        }
        return res.status(200).json(_AddedDebt)

    }catch(error){
      return res.status(500).json({
      Error: error.message,
    });
    }
}
const get_one_customer_Receive_Payment = async (req,res)=>{
     try{

        const userId = req.user.id
        const customerId = req.params.id;
        const _Receive_Paymen = await payment_received.findAll({where:{userId,customerId}})
        if(!_Receive_Paymen){
             throw new Error("not found")
        }
        return res.status(200).json(_Receive_Paymen)

    }catch(error){
      return res.status(500).json({
      Error: error.message,
    });
    }
}


module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  addDebt,
  ReceivePayment,
  getAllAddedDebt_Payment,
  getAllReceive_Payment,
  get_one_customers_AddedDebt_Payment,
  get_one_customer_Receive_Payment
};
