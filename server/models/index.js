
const User = require('./user');
const Item = require('./item');
const ItemSalesSummary = require('./ItemSalesSummary');
const warehouse = require('./warehouse');
const customer = require('./customer');
const payment_sent = require('./payment_sent');
const payment_received = require('./payment_received');
const DoctorPrescription = require('./doctor_prescription');
const Invoice = require('./purchase_Invoice');
const Add_debt_to_customer = require('./Add_debt_to_customer');
const SalesRecord = require('./sales_record');
const Classify = require('./classify');
const Notice = require('./notice');
const customers_debts = require('./customers_debts');
const ItemManyInvoice = require('./item_many_invoice');
const ItemManyClassify = require('./item_many_classify');
const ItemManyDoctorPrescription = require('./item_many_DoctorPrescription');
const ItemManySalesRecord = require('./item_many_salesRecord');

// Define associations here
Item.belongsToMany(Classify, {
  through: ItemManyClassify,
  foreignKey: "itemId",
});
Classify.belongsToMany(Item, {
  through: ItemManyClassify,
  foreignKey: "classifyId",
});

Item.belongsToMany(DoctorPrescription, { through: ItemManyDoctorPrescription, foreignKey: 'itemId' });
DoctorPrescription.belongsToMany(Item, { through: ItemManyDoctorPrescription, foreignKey: 'doctorPrescriptionId' });

Item.belongsToMany(Invoice, { through: ItemManyInvoice, foreignKey: 'itemId' });
Invoice.belongsToMany(Item, { through: ItemManyInvoice, foreignKey: 'invoiceId' });

Item.belongsToMany(SalesRecord, { through: ItemManySalesRecord, foreignKey: 'itemId', otherKey: 'salesRecordId' });
SalesRecord.belongsToMany(Item, { through: ItemManySalesRecord, foreignKey: 'salesRecordId', otherKey: 'itemId' });

module.exports = {
    User,
    Item,
    warehouse,
    customer, 
    payment_sent,
    payment_received,
    DoctorPrescription,
    Invoice,
    Add_debt_to_customer,
    SalesRecord,
    Classify,
    Notice,
    ItemManyInvoice,
    ItemManyClassify,
    ItemManyDoctorPrescription,
    ItemManySalesRecord,
    customers_debts,
    ItemSalesSummary
};