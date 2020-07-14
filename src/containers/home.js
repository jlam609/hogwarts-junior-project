import React from "react";

const Home = () => {
  return (
    <div className={"home"}>
      <h1>Welcome to Hogwarts School of Witchcraft and Wizardry</h1>
      <img
        src={
          "https://images.ctfassets.net/usf1vwtuqyxm/7EsDSrJhr0pNwUNK8lrUwY/f8d7e5101de6dda8f46c0f94673087a9/HP-Hogwarts-39PHOTOBU17074_PHUP_HP.jpg?fm=jpg"
        }
        height={500}
        width={600}
      ></img>
    </div>
  );
};

export default Home;
