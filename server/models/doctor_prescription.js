const {DataTypes} = require('sequelize');
const User = require('./user.js');
const sequelize = require('../db.js');
const doctor_prescription = sequelize.define('doctor_prescription', {
    doctor_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    patient_name:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    patient_age:{
        type: DataTypes.INTEGER,
        allowNull: false
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
User.hasMany(doctor_prescription, { foreignKey: 'userId' });
doctor_prescription.belongsTo(User, { foreignKey: 'userId' }); 
module.exports = doctor_prescription;