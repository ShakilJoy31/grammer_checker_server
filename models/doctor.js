const { DataTypes: dt } = require("sequelize");
const sequelize = require("../database/connection");

const GrammerCorrectionModel = sequelize.define("grammer_checking_prompt_table", {
  id: {
    type: dt.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: dt.STRING,
    allowNull: false,
  },
  correctedText: {
    type: dt.STRING,
    allowNull: false,
  },
  mode: {
    type: dt.STRING,
    allowNull: false,
  }
});

module.exports = GrammerCorrectionModel;