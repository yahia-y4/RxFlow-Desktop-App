const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const Item = require("./item.js");
const Classify = require("./classify.js");

const ItemManyClassify = sequelize.define(
  "item_many_classify",
  {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Item,
        key: "id",
      },
    },
    classifyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Classify,
        key: "id",
      },
    },
    add_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["itemId", "classifyId"],
      },
    ],
  }
);

module.exports = ItemManyClassify;
