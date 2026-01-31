const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const User = require('./user.js');
const warehouse = sequelize.define('warehouse', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    warehouse_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    payable_amount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    isUpdated:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    }

});
User.hasMany(warehouse, { foreignKey: 'userId' });
warehouse.belongsTo(User, { foreignKey: 'userId' });
module.exports = warehouse;
