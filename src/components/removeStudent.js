import React from "react";
import {
  clearInput,
  fetchClassesStudents,
  updateInput
} from "../actions/actions";
import { connect } from "react-redux";
import Axios from "axios";
import {
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";

const RemoveStudent = ({
  classs,
  student,
  classStudents,
  allClasses,
  allStudents,
  selectStudent,
  selectClass,
  removeStudent,
}) => {
  return (
    <div className="form">
      <h1>Remove Student From Class</h1>
      <FormControl>
        <Select value={student} onChange={(e) => selectStudent(e)}>
          <MenuItem value={""}>Select Student</MenuItem>
          {classStudents &&
            classStudents.map((classStudent) => {
              return (
                <MenuItem
                  key={classStudent.id}
                  value={`${classStudent.firstName} ${classStudent.lastName}`}
                >
                  {classStudent.firstName}
                  {classStudent.lastName}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <br />
      <FormControl>
        <Select value={classs} onChange={(e) => selectClass(e, allClasses)}>
          <MenuItem value="">Select Class</MenuItem>
          {allClasses &&
            allClasses.map((classs) => {
              return (
                <MenuItem key={classs.id} value={`${classs.name}`}>
                  {classs.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <br />
      <Button
        onClick={(e) =>
          removeStudent(e, student, classs, allStudents, allClasses)
        }
      >
        Remove Students
      </Button>
    </div>
  );
};

const mapState = ({ input, classStudents, count }) => {
  const { classs, student } = input;
  const { allStudents, allClasses } = count;
  return {
    classs,
    student,
    classStudents,
    allStudents,
    allClasses,
  };
};
const mapDispatch = (dispatch) => {
  const selectStudent = (e) => {
    dispatch(updateInput('student',e.target.value));
  };
  const selectClass = (e, classes) => {
    if (e.target.value === "") {
      dispatch(updateInput('classs',""));
    } else {
      dispatch(updateInput('classs',e.target.value));
      let targetClass = classes.find((elem) => elem.name === e.target.value);
      dispatch(fetchClassesStudents(targetClass.id));
    }
  };
  const removeStudent = async (e, student, classs, students, classes) => {
    e.preventDefault();
    if (student !== "" && classs !== "") {
      let targetStudent = students.find(
        (elem) => `${elem.firstName} ${elem.lastName}` === student
      );
      let targetClass = classes.find((elem) => elem.name === classs);
      const message = (
        await Axios.put(`/api/removeStudent/${targetClass.id}`, {
          ...targetStudent,
        })
      ).data.message;
      dispatch(fetchClassesStudents(targetClass.id));
      dispatch(updateInput('student',""));
    }
  };
  return {
    selectStudent,
    selectClass,
    removeStudent,
  };
};
export default connect(mapState, mapDispatch)(RemoveStudent);
