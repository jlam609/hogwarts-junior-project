import React from "react";
import {
  setStudent,
  clearInput,
  postClassesStudents,
  setClass,
  fetchStudentsClasses,
  fetchClassesStudents,
} from "../actions/actions";
import { connect } from "react-redux";
import {
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";

const EnrollStudent = ({
  classs,
  student,
  allStudents,
  allClasses,
  selectStudent,
  selectClass,
  enrollStudent,
  classStudents,
}) => {
  return (
    <div className="form">
      <h1>Enroll Students</h1>
      <FormControl>
        <Select value={student} onChange={(e) => selectStudent(e)}>
          <MenuItem value="">Select Student</MenuItem>
          {allStudents
            ? allStudents.map((student) => {
                return (
                  <MenuItem
                    key={student.id}
                    value={`${student.firstName} ${student.lastName}`}
                  >
                    {student.firstName} {student.lastName}
                  </MenuItem>
                );
              })
            : null}
        </Select>
        <label>Student</label>
      </FormControl>
      <FormControl>
        <Select value={classs} onChange={(e) => selectClass(e, allClasses)}>
          <MenuItem value=""> Select Class</MenuItem>
          {allClasses
            ? allClasses.map((classs) => {
                return (
                  <MenuItem key={classs.id} value={`${classs.name}`}>
                    {classs.name}
                  </MenuItem>
                );
              })
            : null}
        </Select>
        <label>Class</label>
      </FormControl>
      <Button
        onClick={(e) =>
          enrollStudent(
            e,
            student,
            classs,
            allStudents,
            allClasses,
            classStudents
          )
        }
      >
        Enroll Student
      </Button>
    </div>
  );
};

const mapState = ({ input, count, classStudents }) => {
  const { classs, student } = input;
  const { allStudents, allClasses } = count;
  return {
    classs,
    student,
    allClasses,
    allStudents,
    classStudents,
  };
};
const mapDispatch = (dispatch) => {
  const selectStudent = (e) => {
    dispatch(setStudent(e.target.value));
  };
  const selectClass = (e, classes) => {
    if (e.target.value === "") {
      dispatch(setClass(""));
    } else {
      dispatch(setClass(e.target.value));
      let targetClass = classes.find((elem) => elem.name === e.target.value);
      dispatch(fetchClassesStudents(targetClass.id));
    }
  };
  const enrollStudent = (
    e,
    student,
    classs,
    students,
    classes,
    classStudents
  ) => {
    e.preventDefault();
    if (student !== "" && classs !== "") {
      let targetStudent = students.find(
        (elem) => `${elem.firstName} ${elem.lastName}` === student
      );
      let targetClass = classes.find((elem) => elem.name === classs);

      if (
        classStudents &&
        classStudents.some(
          (classStudent) => classStudent.id === targetStudent.id
        )
      ) {
        alert(
          `${targetStudent.firstName} ${targetStudent.lastName} is already enrolled in this class`
        );
      } else {
        dispatch(
          postClassesStudents({
            studentId: targetStudent.id,
            classId: targetClass.id,
          })
        );
        dispatch(clearInput());
      }
    }
  };
  return {
    selectStudent,
    selectClass,
    enrollStudent,
  };
};
export default connect(mapState, mapDispatch)(EnrollStudent);
