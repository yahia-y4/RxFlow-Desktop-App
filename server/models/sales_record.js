const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const session = require('./session.js');
const User = require('./user.js');

const SalesRecord = sequelize.define('SalesRecord', {

    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    },
   
    create_date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW

    }
});
User.hasMany(SalesRecord, { foreignKey: 'userId' });
SalesRecord.belongsTo(User, { foreignKey: 'userId' });
module.exports = SalesRecord;