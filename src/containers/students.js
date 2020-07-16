import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStudents,
  fetchStudentsClasses,
  getAllStudents,
  clearInput,
  updateInput,
} from "../actions/actions";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";

const Students = ({
  students,
  houses,
  classStudents,
  editStudent,
  deleteStudent,
  studentCount,
  page,
  handlePageChange,
  handleSetStudent,
  student,
  changeFilter,
  searchStudents,
  filter,
  dispatch,
  closeTab
}) => {
  useEffect(() => {
    dispatch(clearInput());
  }, []);
  return (
    <div>
      <form>
        <TextField
          value={filter}
          placeholder="Search Students"
          size="medium"
          onChange={changeFilter}
          onKeyUp = {(e) => searchStudents(e, filter)}
          variant="outlined"
        />
        <IconButton onClick={(e) => searchStudents(e, filter)}>
          <SearchIcon />
        </IconButton>
      </form>

      <div>
        <Pagination
          count={Math.ceil(studentCount / 10)}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => handlePageChange(e, value, filter)}
        />
        <div>
          <h2>Students</h2>
          {students &&
            students.map((curStudent) => {
              return (
                <Card key={curStudent.id}>
                  <div className="students">
                    <CardContent>
                      <li>
                        {curStudent.firstName} {curStudent.lastName}
                      </li>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => handleSetStudent(curStudent, houses)}
                        variant="outlined"
                      >
                        View Data
                      </Button>
                    </CardActions>
                    {student === curStudent ? (
                      <div key={student.id}>
                        <Button
                          onClick={(e) => closeTab(e)}
                          variant="outlined"
                        >
                          Close
                        </Button>
                        <br/>
                        <hr/>
                        <Card>
                          <h1>
                            {student.firstName} {student.lastName}
                          </h1>
                          <li>Email:{student.email}</li>
                          <li>Grade:{student.grade}</li>
                          <br />
                          <h1>Classes</h1>
                          {classStudents
                            ? classStudents.map((classStudent) => {
                                return (
                                  <li key={classStudent.id}>
                                    {classStudent.name}
                                  </li>
                                );
                              })
                            : null}
                          <br />
                          <li>{student.house ? student.house.name : null}</li>
                          <img
                            src={student.house ? student.house.imageURL : null}
                            width={100}
                            height={100}
                          ></img>
                          <hr />
                          <Link to={`editStudent/${student.id}`}>
                            <button onClick={(e) => editStudent(student)}>
                              Edit Student
                            </button>
                          </Link>
                          <hr />
                          <button onClick={(e) => deleteStudent(e, student.id)}>
                            Remove Student
                          </button>
                          <hr />
                        </Card>
                      </div>
                    ) : null}
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapState = ({
  students,
  houses,
  classes,
  classStudents,
  count,
  input,
}) => {
  const { studentCount } = count;
  const { page, student, filter } = input;
  return {
    students,
    houses,
    classStudents,
    classes,
    studentCount,
    page,
    student,
    filter,
  };
};
const mapDispatch = (dispatch) => {
  const editStudent = (student) => {
    dispatch(updateInput('student',student));
    dispatch(updateInput('firstName',student.firstName));
    dispatch(updateInput('lastName',student.lastName));
    dispatch(updateInput('email',student.email));
    dispatch(updateInput('grade',student.grade));
  };
  const deleteStudent = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/api/classes_students/${id}`);
    await axios.delete(`/api/students/${id}`);
    const { Students } = (await axios.get("/api/all/students")).data;
    dispatch(fetchStudents());
    dispatch(getAllStudents(Students));
  };
  const handlePageChange = (e, value, filter) => {
    e.preventDefault();
    dispatch(updateInput('page',value));
    dispatch(fetchStudents(filter, value));
  };
  const handleSetStudent = (student, houses) => {
    const house = houses.find((house) => house.id === student.houseId);
    student.house = house;
    dispatch(updateInput('student',student));
    dispatch(fetchStudentsClasses(student.id));
  };
  const closeTab = (e) => {
      e.preventDefault() 
      dispatch(updateInput('student',''))
  }
  const changeFilter = (e) => {
    dispatch(updateInput('filter',e.target.value));
  };
  const searchStudents = (e, filter) => {
    dispatch(fetchStudents(filter));
  };

  return {
    dispatch,
    editStudent,
    deleteStudent,
    handlePageChange,
    handleSetStudent,
    changeFilter,
    searchStudents,
    closeTab
  };
};

export default connect(mapState, mapDispatch)(Students);
