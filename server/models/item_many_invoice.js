const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Item = require('./item.js');
const Invoice = require('./purchase_Invoice.js');  // تصحيح مسار الاستيراد

const ItemManyInvoice = sequelize.define('item_many_invoice', {
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Item,
            key: 'id'
        }
    },
    invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Invoice,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,   
            fields: ["itemId", "invoiceId"],
        },
    ],  
});

module.exports = ItemManyInvoice;