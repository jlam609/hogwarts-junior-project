const db = require("../db");
const { UUID, STRING, UUIDV4 } = require("sequelize");

const Classes = db.define("class", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  imageURL: {
    type: STRING,
    defaultValue:
      "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/06/Hogwarts.jpg?q=50&fit=crop&w=960&h=500",
  },
});

module.exports = Classes;
