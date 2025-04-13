const { DataTypes: dt } = require("sequelize");
const sequelize = require("../database/connection");

const GrammerCorrectionModel = sequelize.define("grammer_corrections", {
  id: {
    type: dt.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  original_text: {
    type: dt.TEXT,
    allowNull: false,
  },
  corrected_text: {
    type: dt.TEXT,
    allowNull: false,
  },
  mode: {
    type: dt.ENUM('basic', 'explanation', 'formal'),
    allowNull: false,
  },
  corrections: {
    type: dt.JSON,
    allowNull: true,
  },
  usage_details: {
    type: dt.JSON,
    allowNull: true,
  },
  created_at: {
    type: dt.DATE,
    defaultValue: dt.NOW,
  }
}, {
  timestamps: false,
  tableName: 'grammer_corrections'
});

module.exports = GrammerCorrectionModel;