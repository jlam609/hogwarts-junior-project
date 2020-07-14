const { db, Classes, Houses, Students, Classes_Students } = require("./models");
const faker = require("faker");

const seedData = async () => {
  const houseList = [
    {
      name: "GRYFFINDOR",
      imageURL:
        "https://images-na.ssl-images-amazon.com/images/I/61Qz84jh8nL._AC_SX522_.jpg",
    },
    {
      name: "SLYTHERIN",
      imageURL:
        "https://images-na.ssl-images-amazon.com/images/I/71g-kd5oInL._AC_SY879_.jpg",
    },
    {
      name: "RAVENCLAW",
      imageURL:
        "https://images-na.ssl-images-amazon.com/images/I/71FqSSj5S%2BL._AC_SL1400_.jpg",
    },
    {
      name: "HUFFLEPUFF",
      imageURL:
        "https://static.artfire.com/uploads/mfs/items/f0/c5/large/f0c5f8e10fbc8bf2514b94643ef179206cf787136f3bc5aedadf0115559d5cbb.jpg",
    },
  ];
  const studentsList = [];
  const grades = ["O", "E", "A", "D", "P", "T"];
  const houses = await Promise.all(
    houseList.map((house) => Houses.create(house))
  );
  for (let i = 0; i < 190; i++) {
    studentsList.push({
      lastName: faker.name.lastName(),
      firstName: faker.name.firstName(),
      email: faker.internet.email(),
      grade: grades[Math.floor(Math.random() * grades.length)],
      houseId: houses[Math.floor(Math.random() * houses.length)].id,
    });
  }
  const classList = [
    {
      name: "Potions",
      imageURL:
        "https://vignette.wikia.nocookie.net/harrypotter/images/0/06/Potions.jpg/revision/latest?cb=20161210025049",
    },
    {
      name: "Quidditch",
      imageURL:
        "https://i.pinimg.com/originals/f5/c4/d0/f5c4d0bf473ebb29c249bd129f777586.jpg",
    },
    {
      name: "Charms",
      imageURL:
        "https://images-na.ssl-images-amazon.com/images/I/71dHX55TGqL.jpg",
    },
    {
      name: "Transfiguration",
      imageURL:
        "https://i.pinimg.com/originals/4c/e8/13/4ce813d62349e5b0a2752df2672ba4e3.jpg",
    },
    {
      name: "Flying",
      imageURL:
        "https://vignette.wikia.nocookie.net/harrypotter/images/1/1a/Flying_class_in_1991.jpg/revision/latest?cb=20161213051125",
    },
    {
      name: "Defense Against The Dark Arts",
      imageURL:
        "https://cdnb.artstation.com/p/assets/images/images/014/854/239/large/michele-di-basilio-screenshot00001.jpg?1545920711",
    },
    {
      name: "Spells",
      imageURL:
        "https://cdnb.artstation.com/p/assets/images/images/014/854/239/large/michele-di-basilio-screenshot00001.jpg?1545920711",
    },
  ];
  const students = await Promise.all(
    studentsList.map((student) => Students.create(student))
  );
  const classes = await Promise.all(
    classList.map((classSingle) => Classes.create(classSingle))
  );
  let j = 0;
  for (let i = 0; i < students.length; i++) {
    if (i % 27 === 0 && i !== 0) j++;
    else classes[j].addStudents(students[i]);
  }
};
const seed = async (force = false) => {
  try {
    await db.sync({ force });
    if (force) {
      await seedData();
    }
    console.log("seed was successful!");
  } catch (e) {
    throw new Error("seed unsuccessful!", e);
  }
};

module.exports = {
  db,
  seed,
  models: {
    Classes,
    Houses,
    Students,
    Classes_Students,
  },
};
