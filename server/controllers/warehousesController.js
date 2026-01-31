const { warehouse, payment_sent } = require("../models")
const sequelize = require("../db");
const {createNotice} = require('./noticeController.js')
const {loadSettings} = require('./appSettingsConroller.js')


const createWarehouse = async (req, res) => {
    try {
        const appSettingsData = loadSettings()
        const userId = req.user.id;
        const { name, phone_number, location, warehouse_name, payable_amount } = req.body;
        const newWarehouse = await warehouse.create({ name, phone_number, location, warehouse_name, payable_amount, userId });
       
        if(appSettingsData.Notices_Settings.Add_supplier_Notices){
            const title = "اضافة مورد";
            const content =  "لقائمة الموردين ("+name+") تمت اضافة المورد ";
            createNotice(userId,title,content)
        }
        res.status(201).json(newWarehouse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}

const updateWarehouse = async (req, res) => {
    try {
        const appSettingsData = loadSettings()
        const userId = req.user.id;
        const { id } = req.params;
        const { name, phone_number, location, warehouse_name } = req.body;
        const oldWarehouse = await warehouse.findOne({where:{id,userId}})
        if(!oldWarehouse){
            return res.status(404).json({ error: "Warehouse not found" });
        }
        const oldName = oldWarehouse.name
        await oldWarehouse.update({ name, phone_number, location, warehouse_name, isUpdated: true });
                await oldWarehouse.save()
        if(appSettingsData.Notices_Settings.Update_supplier_Notices){
            const title = "تحديث مورد";
            const content =  " ("+oldName+") تم تحديث المعلومات الاساسية للمورد السابق ";
            createNotice(userId,title,content)
        }

        res.status(200).json({ message: "Warehouse updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:error.message });
    }
}

const getWarehouses = async (req, res) => {
    try {
        const userId = req.user.id;
        const warehouses = await warehouse.findAll({
            where: { userId },
            attributes: ["id", "name", "warehouse_name","phone_number"]
        });
        res.status(200).json(warehouses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}

const getWarehouseById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const foundWarehouse = await warehouse.findOne({ where: { id, userId } });
        if (!foundWarehouse) {
            return res.status(404).json({ error: "Warehouse not found" });
        }
        res.status(200).json(foundWarehouse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}
const deleteWarehouse = async (req, res) => {
    try {
        const appSettingsData = loadSettings()
        const { id } = req.params;
        const userId = req.user.id;
        const _Warehouse = await warehouse.findOne({
            where: { id, userId, payable_amount: 0 }
        });
        if (!_Warehouse) {
            return res.status(400).json({ message: "Cannot delete: Either warehouse not found or payable_amount is not zero." });
        }
        const oldName = _Warehouse.name
        await _Warehouse.destroy()
        if(appSettingsData.Notices_Settings.Delete_supplier_Notices){
            const title = "حذف مورد";
            const content =  " ("+oldName+") تم حذف المورد ";
            createNotice(userId,title,content)
        }
        res.status(200).json({ message: "Warehouse deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}

const sendPayment = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const appSettingsData = loadSettings()
        const userId = req.user.id;
        const { id } = req.params;
        const { payable_amount_send,note } = req.body;

        // الحصول على المستودع الحالي
        const currentWarehouse = await warehouse.findOne({
            where: { id, userId },
            transaction
        });

        if (!currentWarehouse) {
            throw new Error("Warehouse not found");
        }

        if(currentWarehouse.payable_amount < payable_amount_send){
            throw new Error("Not enough payable_amount");
        }
        await warehouse.update(
            { payable_amount: currentWarehouse.payable_amount - payable_amount_send },
            { where: { id, userId }, transaction }
        );

        // إنشاء سجل الدفع
        await payment_sent.create({
            warehouseId: id,
            userId,
            amount: payable_amount_send,
            note,
        }, { transaction });
if(appSettingsData.Notices_Settings.payment_supplier_Notices){
    const title = "دفع لمورد";
    const content = `تم دفع مبلغ ${payable_amount_send} للمورد ${currentWarehouse.name}`;
    createNotice(userId,title,content)
}
        await transaction.commit();
        res.status(200).json({ message: "Warehouse updated successfully" });

    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}

const getPaymentSentHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const payments = await payment_sent.findAll({
            where: { userId },
            include: [
                {
                    model: warehouse,
                    attributes: ["id","name", "warehouse_name","phone_number"]
                }
            ],
         
        });
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}
const getPaymentSentHistory_one_warehouse = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const payments = await payment_sent.findAll({
            where: { userId,warehouseId:id },
       
         
        });
        res.status(200).json(payments);
    } catch (error) {
       
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
     createWarehouse,
     updateWarehouse,
     getWarehouses,
     getWarehouseById,
     deleteWarehouse,
     sendPayment,
     getPaymentSentHistory,
     getPaymentSentHistory_one_warehouse 
    }
