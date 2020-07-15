import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateInput } from "../actions/actions";
import { Button, Card, CardContent } from "@material-ui/core";

const Houses = ({ houses, allStudents, house, changeHouse }) => {
  useEffect(() => {
    houses.forEach((house) => {
      const studentList = allStudents.filter(
        (student) => student.houseId === house.id
      );
      house.students = [...studentList];
    });
  }, []);
  return (
    <div>
      <h1>Houses</h1>
      {houses.map((curHouse) => {
        return (
          <div key={curHouse.id}>
            <Card>
              <h1>{curHouse.name}</h1>
              <Button
                onClick={(e) => changeHouse(e, curHouse)}
                variant="outlined"
              >
                View More Information
              </Button>
              <br />
              {house && house.id === curHouse.id ? (
                <div>
                  <br/>
                  <Button
                    onClick={(e) => changeHouse(e, "")}
                    variant="outlined"
                  >
                    Close
                  </Button>
                  <br />
                  {house.students ? (
                    <div>
                      <h2>Students</h2>
                      <div>
                        {house.students.map((student) => {
                          return (
                            <CardContent key={student.id}>
                              {student.firstName} {student.lastName}
                            </CardContent>
                          );
                        })}
                      </div>{" "}
                    </div>
                  ) : null}
                </div>
              ) : null}
              <img src={curHouse.imageURL} width={200} height={300}></img>
              <hr />
            </Card>
          </div>
        );
      })}
    </div>
  );
};

const mapState = ({ houses, count, input }) => {
  const { allStudents } = count;
  houses.forEach((house) => {
    const studentList = allStudents.filter(
      (student) => student.houseId === house.id
    );
    house.students = [...studentList];
  });
  const { house } = input;
  return {
    houses,
    allStudents,
    house,
  };
};
const mapDispatch = (dispatch) => {
  const changeHouse = (e, house) => {
    e.preventDefault();
    dispatch(updateInput('house',house));
  };
  return {
    changeHouse,
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(Houses);
