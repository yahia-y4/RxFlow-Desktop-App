const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = sequelize.define("User",{
    UserName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    Password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Role:{
        type:DataTypes.STRING,
        allowNull:true
    }

})
module.exports = User