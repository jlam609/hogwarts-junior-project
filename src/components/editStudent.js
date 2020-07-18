import React from "react";
import { fetchStudents, clearInput, updateInput } from "../actions/actions";
import { connect } from "react-redux";
import axios from "axios";
import {
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";

const EditStudent = ({
  firstName,
  lastName,
  email,
  grade,
  student,
  editStudent,
  handleFirstName,
  handleLastName,
  handleEmail,
  handleSelectGrade,
}) => {
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
        <Select value={grade} onChange={handleSelectGrade}>
          <MenuItem value="">Select Grade</MenuItem>
          <MenuItem value="O">O</MenuItem>
          <MenuItem value="E">E</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="P">P</MenuItem>
          <MenuItem value="D">D</MenuItem>
          <MenuItem value="T">T</MenuItem>
        </Select>{" "}
        <label> Grade </label>
        <br />
        <Button
          onClick={(e) =>
            editStudent(e, firstName, lastName, email, grade, student.id)
          }
        >
          Edit Student
        </Button>
      </FormControl>
    </div>
  );
};

const mapState = ({ input, houses }) => {
  const { firstName, lastName, email, grade, student } = input;
  return {
    firstName,
    lastName,
    email,
    grade,
    houses,
    student,
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
  const editStudent = async (e, firstName, lastName, email, grade, id) => {
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
      await axios.put(`/api/students/${id}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        grade: grade,
      });
      dispatch(fetchStudents());
      dispatch(clearInput());
    }
  };
  return {
    handleFirstName,
    handleLastName,
    handleEmail,
    handleSelectGrade,
    editStudent,
  };
};

export default connect(mapState, mapDispatch)(EditStudent);
