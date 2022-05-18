const { DataTypes } = require("sequelize");
const { database } = require("../utils/database");

const User = database.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // profileImgUrl: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "customer",
  },
});

module.exports = { User };
