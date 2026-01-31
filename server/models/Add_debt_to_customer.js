const {DataTypes} = require('sequelize');

const sequelize = require('../db.js');
const customer = require('./customer.js');



const Add_debt_to_customer = sequelize.define('add_debt_to_customer', {
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    debt_date:{
        type:DataTypes.DATE,    
        allowNull:false,
        defaultValue: DataTypes.NOW
    },      
    note:{
        type:DataTypes.STRING,
        allowNull:true  
    },
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:customer,
            key:'id'
        }
    }
});
customer.hasMany(Add_debt_to_customer, { foreignKey: 'customerId' });
Add_debt_to_customer.belongsTo(customer, { foreignKey: 'customerId' });
module.exports = Add_debt_to_customer;