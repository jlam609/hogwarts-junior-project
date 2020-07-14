const Classes = require("./classes");
const Houses = require("./houses");
const Students = require("./students");
const Classes_Students = require("./classes-students");
const db = require("../db");

Classes.belongsToMany(Students, { through: Classes_Students });
Students.belongsToMany(Classes, { through: Classes_Students });
Students.belongsTo(Houses);
Houses.hasMany(Students);

module.exports = {
  db,
  Students,
  Houses,
  Classes,
  Classes_Students,
};
