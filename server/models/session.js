const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const User = require('./user.js');
const session = sequelize.define('session', {
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW
    },
    end_date:{
        type:DataTypes.DATE,
        allowNull:false,
    }
});
User.hasMany(session, { foreignKey: 'userId' });
session.belongsTo(User, { foreignKey: 'userId' }); 

   