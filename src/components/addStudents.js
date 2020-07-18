import React, { useEffect } from "react";
import { clearInput, postStudents, updateInput } from "../actions/actions";
import { connect } from "react-redux";
import {
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";

const AddStudent = ({
  firstName,
  lastName,
  email,
  grade,
  houses,
  studentCount,
  handleFirstName,
  handleLastName,
  handleEmail,
  handleSelectGrade,
  submitStudent,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(clearInput());
  }, []);
  return (
    <div className="form">
      <FormControl>
        <TextField
          value={firstName}
          onChange={(e) => handleFirstName(e)}
          variant={"outlined"}
          size="small"
          label="First Name"
        />{" "}
        <br />
        <TextField
          value={lastName}
          onChange={(e) => handleLastName(e)}
          variant={"outlined"}
          size="small"
          label="Last Name"
        />{" "}
        <br />
        <TextField
          value={email}
          onChange={(e) => handleEmail(e)}
          variant={"outlined"}
          size="small"
          label="Email"
        />{" "}
        <br />
        <Select value={grade} onChange={handleSelectGrade} label="grade">
          <MenuItem value="">Select Grade</MenuItem>
          <MenuItem value="O">O</MenuItem>
          <MenuItem value="E">E</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="P">P</MenuItem>
          <MenuItem value="D">D</MenuItem>
          <MenuItem value="T">T</MenuItem>
        </Select>{" "}
        <label>Select Grade</label>
        <br />
        <Button
          onClick={(e) =>
            submitStudent(
              e,
              firstName,
              lastName,
              email,
              grade,
              houses,
              studentCount
            )
          }
          variant="outlined"
        >
          Add Student
        </Button>
      </FormControl>
    </div>
  );
};

const mapState = ({ input, houses, count }) => {
  const { firstName, lastName, email, grade } = input;
  const { studentCount } = count;
  return {
    firstName,
    lastName,
    email,
    grade,
    houses,
    studentCount,
  };
};

const mapDispatch = (dispatch) => {
  const handleFirstName = (e) => {
    e.preventDefault();
    dispatch(updateInput("firstName", e.target.value));
  };
  const handleLastName = (e) => {
    e.preventDefault();
    dispatch(updateInput("lastName", e.target.value));
  };
  const handleEmail = (e) => {
    e.preventDefault();
    dispatch(updateInput("email", e.target.value));
  };
  const handleSelectGrade = (e) => {
    dispatch(updateInput("grade", e.target.value));
  };
  const submitStudent = (
    e,
    firstName,
    lastName,
    email,
    grade,
    houses,
    count
  ) => {
    e.preventDefault();
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      grade !== "" &&
      email.indexOf("@") >= 0 &&
      typeof firstName == "string" &&
      typeof lastName == "string" &&
      typeof email == "string" &&
      typeof grade == "string"
    ) {
      dispatch(
        postStudents(
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            grade: grade,
            houseId: houses[Math.round(Math.random() * houses.length - 1)].id,
          },
          count + 1
        )
      );
      dispatch(clearInput());
    } else alert("All fields must be completed before adding student!");
  };

  return {
    handleFirstName,
    handleLastName,
    handleEmail,
    handleSelectGrade,
    submitStudent,
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(AddStudent);
