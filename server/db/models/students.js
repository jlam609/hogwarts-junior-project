const db = require("../db");
const { UUID, STRING, ENUM, UUIDV4 } = require("sequelize");

const Students = db.define("student", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  grade: {
    type: ENUM,
    values: ["O", "E", "A", "D", "P", "T"],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Students;
