const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const customer = require('./customer.js');
const user = require('./user.js');

const Payment_received = sequelize.define('payment_received', {
userId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
        model:user,
        key:'id'
    }
},
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    payment_date:{
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
},{timestamps: false});
user.hasMany(Payment_received, { foreignKey: 'userId' });
Payment_received.belongsTo(user, { foreignKey: 'userId' });
customer.hasMany(Payment_received, { foreignKey: 'customerId' });
Payment_received.belongsTo(customer, { foreignKey: 'customerId' });
module.exports = Payment_received;
    