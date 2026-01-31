const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const User = require('./user.js');
const Notice = sequelize.define('Notice', {
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    IsRead:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
});
Notice.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Notice, { foreignKey: 'userId' });
module.exports = Notice;
