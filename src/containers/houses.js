import React, { useEffect } from "react";
import { connect } from "react-redux";

const Houses = ({ houses, students }) => {
  useEffect(() => {
    houses.forEach((house) => {
      const studentList = students.filter(
        (student) => student.houseId === house.id
      );
      house.students = [...studentList];
    });
  }, []);
  return (
    <div>
      <h1>Houses</h1>
      {houses.map((house) => {
        return (
          <div key={house.id}>
            <h1>{house.name}</h1>
            <img src={house.imageURL} width={200} height={300}></img>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

const mapState = ({ houses, students }) => {
  houses.forEach((house) => {
    const studentList = students.filter(
      (student) => student.houseId === house.id
    );
    house.students = [...studentList];
  });
  return {
    houses,
    students,
  };
};

export default connect(mapState)(Houses);
