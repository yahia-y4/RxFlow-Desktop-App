const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const User = require('./user.js');
const classfy = sequelize.define('classify', {
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    },
    name:{  
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    }
});
classfy.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(classfy, { foreignKey: 'userId' });
module.exports = classfy;