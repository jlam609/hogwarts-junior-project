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
        "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/88364/91134/Harry-Potter-Hufflepuff-Crest-Official-wall-mounted-cardboard-cutout-buy-now-at-star__21122.1507640936.jpg?c=2&imbypass=on",
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
      name: "Defense Against The Dark Arts",
      imageURL:
        "https://cdnb.artstation.com/p/assets/images/images/014/854/239/large/michele-di-basilio-screenshot00001.jpg?1545920711",
    },
    {
      name: "Spells",
      imageURL:
      'https://blueprint-api-production.s3.amazonaws.com/uploads/story/thumbnail/79096/59c028ac-9679-4c93-91b9-c7f1530bc288.jpg',
    },
    {
      name: "Care of Magical Creatures",
      imageURL:
        "https://static1.srcdn.com/wordpress/wp-content/uploads/2018/11/Harry-Potter-Fantastic-Beasts-magical-creatures.jpg",
    },
    {
      name: "Astronomy",
      imageURL:
        "https://sociable.co/wp-content/uploads/2019/06/galaxy-telescope-1280x720.jpg",
    },
    {
      name: "Herbology",
      imageURL:
        "https://payload.cargocollective.com/1/15/490205/13304828/herbologyrgbtumblr_700.jpg",
    },
    {
      name: "History of Magic",
      imageURL:
        "https://kbimages1-a.akamaihd.net/189b4e8c-1b14-448b-9773-59995ce1bc2e/1200/1200/False/the-history-of-magic-5.jpg",
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
