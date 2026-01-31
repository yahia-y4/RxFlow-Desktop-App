const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');
const User = require('./user.js');
const Item = sequelize.define('Item', {

name:{
    type: DataTypes.STRING,
    allowNull: false
},
company:{
    type: DataTypes.STRING,
    allowNull: false
},
form :{
    type: DataTypes.STRING,
    allowNull: false
},
concent:{
    type: DataTypes.STRING,
    allowNull: false
},
concent_unit:{
    type: DataTypes.STRING,
    allowNull:false
},
titer:{
    type:DataTypes.STRING,
    allowNull:false
},
titer_unit:{
    type:DataTypes.STRING,
    allowNull:false
},
package_type:{
    type:DataTypes.STRING,
    allowNull:false
},
quantity:{
    type:DataTypes.INTEGER,
    allowNull:false
},
price:{
    type:DataTypes.FLOAT,
    allowNull:false
},
profit:{
    type:DataTypes.FLOAT,
    allowNull:false
},
code:{
    type:DataTypes.STRING,
    allowNull:false
},
expiry_date:{
    type:DataTypes.DATE,
    allowNull:false
},

isUpdated:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
},
isDeleted:{
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
})
Item.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Item,{foreignKey: 'userId'});

module.exports = Item;