const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const Item = require('./item.js');
const DoctorPrescription = require('./doctor_prescription.js');
const ItemManyDoctorPrescription = sequelize.define('item_many_doctorPrescription', {
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Item,
            key: 'id'
        }
    },
    doctorPrescriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: DoctorPrescription,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,

        allowNull: false
    },
    price: {    
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["itemId", "doctorPrescriptionId"],
        },
    ],
});




module.exports = ItemManyDoctorPrescription;