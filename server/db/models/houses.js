const db = require("../db");
const { UUID, ENUM, UUIDV4, STRING } = require("sequelize");

const Houses = db.define("house", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: ENUM,
    values: ["GRYFFINDOR", "SLYTHERIN", "RAVENCLAW", "HUFFLEPUFF"],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageURL: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Houses;
