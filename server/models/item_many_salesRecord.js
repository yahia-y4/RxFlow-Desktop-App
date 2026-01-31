const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Item = require('./item.js');
const SalesRecord = require('./sales_record.js');

const ItemManySalesRecord = sequelize.define('item_many_salesRecord', {
    itemId: {
        type: DataTypes.INTEGER,    
        allowNull: false,
        references: {
            model: Item,
            key: 'id'
        }
    },      
    salesRecordId: {        
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SalesRecord,
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
            fields: ['itemId', 'salesRecordId']  
        }
    ]
});

module.exports = ItemManySalesRecord;
