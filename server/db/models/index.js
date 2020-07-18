const Classes = require("./classes");
const Houses = require("./houses");
const Students = require("./students");
const Classes_Students = require("./classes-students");
const User = require('./users')
const db = require("../db");
const Session = require('./session');


Classes.belongsToMany(Students, { through: Classes_Students });
Students.belongsToMany(Classes, { through: Classes_Students });
Students.belongsTo(Houses);
Houses.hasMany(Students);
User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  db,
  Students,
  Houses,
  Classes,
  Classes_Students,
  User,
  Session
};
