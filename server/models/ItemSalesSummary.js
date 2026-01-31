const {DataTypes} = require('sequelize')

const sequelize = require('../db.js');
const User = require('./user.js');
const Item = require('./item.js');

const ItemSalesSummary = sequelize.define('ItemSalesSummary',{
    itemId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Item,
            key: 'id'
        }
    },
 quantity:{
    type: DataTypes.INTEGER,
    allowNull: false
 },
    sales:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    profit:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: User,
            key: 'id'
        }
    }
     
})

ItemSalesSummary.belongsTo(User,{
    foreignKey: 'userId',
})
User.hasMany(ItemSalesSummary,{
    foreignKey: 'userId',
})

ItemSalesSummary.belongsTo(Item,{
    foreignKey: 'itemId',
})
Item.hasOne(ItemSalesSummary,{
    foreignKey: 'itemId',
})

module.exports = ItemSalesSummary
