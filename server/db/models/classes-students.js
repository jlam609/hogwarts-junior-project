const db = require("../db");
const { UUID, UUIDV4 } = require("sequelize");


const Classes_Students = db.define("class-student", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = Classes_Students;
