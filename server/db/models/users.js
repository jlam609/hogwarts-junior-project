const { STRING, UUID, UUIDV4 } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    },
  salt:{
      type:STRING,
      allowNull:false
  }
});

module.exports = User;
