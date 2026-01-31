const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const customer = require('./customer.js');
const user = require('./user.js');
const customers_debts = sequelize.define('customers_debts', {
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:user,
            key:'id'
        }
    },
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:customer,
            key:'id'
        }
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    note:{
        type:DataTypes.STRING,
        allowNull:true
    },
    debt_date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    }
},{timestamps: false});
user.hasMany(customers_debts, { foreignKey: 'userId' });
customers_debts.belongsTo(user, { foreignKey: 'userId' });
customer.hasMany(customers_debts, { foreignKey: 'customerId' });
customers_debts.belongsTo(customer, { foreignKey: 'customerId' });
module.exports = customers_debts;
