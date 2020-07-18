const { models, User, Session } = require("../db");
const { Router } = require("express");
const { pluralize } = require("inflection");
const { Students, Classes, Classes_Students, Houses } = models;
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const path = require("path");
const passport = require('passport')
const apiRouter = Router();
const bcrypt = require('bcrypt')

Object.entries(models).forEach(([name, model]) => {
  apiRouter.get(`/api/all/${pluralize(name)}`, async (req, res) => {
    try {
      const itemList = await model.findAll();
      res.status(200).send({
        [pluralize(name)]: itemList,
      });
    } catch (e) {
      throw new Error("error getting data", e);
    }
  });
  apiRouter.post(`/api/${pluralize(name)}`, async (req, res) => {
    try {
      const body = req.body;
      const grades = ["O", "E", "A", "P", "D", "T"];
      let item;
      if (
        body.firstName &&
        typeof body.firstName == "string" &&
        body.lastName &&
        typeof body.lastName == "string" &&
        body.email &&
        typeof body.email == "string" &&
        body.grade &&
        grades.indexOf(body.grade) >= 0 &&
        body.houseId
      ) {
        item = await model.create({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          grade: body.grade,
          houseId: body.houseId,
        });
      } else if (
        body.name &&
        typeof body.name == "string" &&
        body.imageURL &&
        typeof body.imageURL == "string"
      ) {
        item = await model.create({
          name: body.name,
          imageURL: body.imageURL,
        });
      } else if (body.name && typeof body.name == "string") {
        item = await model.create({
          name: body.name,
        });
      } else if (body.classId && body.studentId) {
        item = await model.create({
          classId: body.classId,
          studentId: body.studentId,
        });
      }
      res.status(200).send({
        item: item,
        message: `${
          item.firstName ? item.firstName + "" + item.lastName : item.name
        } has been created!`,
      });
    } catch (e) {
      res.status(500).send({
        message: `error creating data`,
      });
      throw new Error(e);
    }
  });
  apiRouter.put(`/api/${pluralize(name)}/:id`, async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const grades = ["O", "E", "A", "P", "D", "T"];
      if (body.firstName && typeof body.firstName == "string") {
        await model.update(
          {
            firstName: body.firstName,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      if (body.lastName && typeof body.lastName == "string") {
        await model.update(
          {
            lastName: body.lastName,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      if (body.email && typeof body.email == "string") {
        await model.update(
          {
            email: body.email,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      if (body.grade && grades.indexOf(body.grade) >= 0) {
        await model.update(
          {
            grade: body.grade,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      if (body.name && typeof body.name === "string") {
        await model.update(
          {
            name: body.name,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      if (body.imageURL && typeof body.imageURL === "string") {
        await model.update(
          {
            imageURL: body.imageURL,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      res.status(200).send({
        message: `id ${id} has been updated successfully!`,
      });
    } catch (e) {
      res.status(500).send({
        message: `error updating ${id}`,
      });
    }
  });
});

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;
  return {
    limit,
    offset,
  };
};

apiRouter.get("/api/students/?", async (req, res) => {
  try {
    const { filter, page, size } = req.query;
    let studentData;
    const { limit, offset } = getPagination(page, size);
    if (!filter.length) {
      studentData = await Students.findAndCountAll({
        limit,
        offset,
        where: {},
        order: [["lastName", "ASC"]],
      });
    } else {
      studentData = await Students.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: [
            { lastName: { [Op.iLike]: "%" + filter + "%" } },
            { firstName: { [Op.iLike]: "%" + filter + "%" } },
          ],
        },
        order: [["lastName", "ASC"]],
      });
    }
    res.send(studentData);
  } catch (e) {
    throw new Error("error sending data", e);
  }
});
apiRouter.get("/api/classes/?", async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const classData = await Classes.findAndCountAll({
      limit,
      offset,
      where: {},
      order: [["name", "ASC"]],
    });
    res.status(200).send(classData);
  } catch (e) {
    throw new Error("error sending data", e);
  }
});

apiRouter.get("/api/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const studentsList = await Classes.findAll({
      include: [
        {
          model: Students,
          where: {
            id: id,
          },
        },
      ],
      order: [["name", "ASC"]],
    });
    res.status(200).send(studentsList);
  } catch (e) {
    res.status(500).send("error with data");
    throw new Error(e);
  }
});
apiRouter.get("/api/classes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const classesList = await Students.findAll({
      include: [
        {
          model: Classes,
          where: {
            id: id,
          },
        },
      ],
      order: [["lastName", "ASC"]],
    });
    res.status(200).send(classesList);
  } catch (e) {
    res.status(500).send("error with data");
    throw new Error(e);
  }
});
apiRouter.put(`/api/removeStudent/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const { id: studentId } = req.body;
    await Classes_Students.destroy({
      where: {
        classId: id,
        studentId: studentId,
      },
    });
    res.status(200).send({
      message: `studentId${studentId} has been removed from class ${id}`,
    });
  } catch (e) {
    res.status(500).send({
      message: console.error("error with data", e),
    });
  }
});

apiRouter.delete(`/api/students/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    await Students.destroy({
      where: {
        id: id,
      },
    });
    res.status(202).send({
      message: `id ${id} has been removed`,
    });
  } catch (e) {
    res.status(500).send({
      message: `error deleting data`,
    });
    throw new Error(e);
  }
});
apiRouter.delete(`/api/classes/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    await Classes.destroy({
      where: {
        id: id,
      },
    });
    res.status(202).send({
      message: `id ${id} has been removed`,
    });
  } catch (e) {
    res.status(500).send({
      message: `error deleting data`,
    });
    throw new Error(e);
  }
});
apiRouter.delete(`/api/classes_students/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    await Classes_Students.destroy({
      where: {
        classId: id,
      },
    });
    await Classes_Students.destroy({
      where: {
        studentId: id,
      },
    });
    res.status(202).send({
      message: `id ${id} has been removed`,
    });
  } catch (e) {
    res.status(500).send({
      message: `error deleting data`,
    });
    throw new Error(e);
  }
});
apiRouter.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    await User.create({
      username:username,
      password:hash,
      salt:salt
    });
    res.status(202).send({
      message: `user ${username} successfully created`,
    });
  }
  } catch (e) {
    res.status(500).send({
      message: ("error creating user", e),
    });
  }
});
apiRouter.post('/login', passport.authenticate('local', 
	{
		failureRedirect:'/login',
		failureFlash:'Login failed'
  }), async function(req, res){; 
   const userId = req.user.id
   const usersSession = await Session.findByPk(req.cookies.session_id);
   await usersSession.setUser(userId);
	res.send({
    message:`${req.user.username} found`
  });
});
apiRouter.get('/api/login', (req,res) => {
  try {
  if (req.user) {
    res.send({
      username:req.user.username,
      password:req.user.password
    })
  }
  }
  catch(e){
    console.error(e)
  }
})
apiRouter.delete('/api/logout', (req,res) => {
  try{
    req.logOut()
    res.clearCookie('session_id')
    res.status(200).send({
      message:'successfully deleted'
    })
  }
  catch(e){
    console.error(e)
    res.sendStatus(500)
  }
})
apiRouter.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = apiRouter;
