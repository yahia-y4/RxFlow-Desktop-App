const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const User = require('./user.js');

const customer = sequelize.define('customer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    phone_number: {
        type: DataTypes.INTEGER,  // تغيير من NUMBER إلى INTEGER
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    debts: {
        type: DataTypes.DECIMAL(10, 2),  // تغيير من NUMBER إلى DECIMAL
        allowNull: false
    },
    isUpdated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {  // نقل references داخل تعريف userId
            model: User,
            key: 'id'
        }
    }
});

User.hasMany(customer, { foreignKey: 'userId' });
customer.belongsTo(User, { foreignKey: 'userId' }); 

module.exports = customer;