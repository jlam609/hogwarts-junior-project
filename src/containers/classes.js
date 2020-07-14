import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setClass,
  setClassName,
  setClassImage,
  fetchClasses,
  fetchClassesStudents,
  setPage,
  clearInput,
  getAllClasses,
} from "../actions/actions";
import axios from "axios";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const Classes = ({
  classes,
  page,
  classs,
  classStudents,
  enrollStudent,
  editClass,
  deleteClass,
  classesCount,
  handlePageChange,
  showStudents,
  removeStudent,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(clearInput());
  }, []);
  return (
    <div>
      <div>
        <Pagination
          count={Math.ceil(classesCount / 3)}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
        <div>
          <h2>Classes</h2>
          {classes &&
            classes.map((curClass) => {
              return (
                <Card key={curClass.id}>
                  <div className="students">
                    <CardContent>
                      <h2>{curClass.name}</h2>
                      <br />
                      <img
                        src={curClass.imageURL}
                        width={250}
                        height={200}
                      ></img>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={(e) => showStudents(e, curClass)}
                        variant="outlined"
                      >
                        View Students
                      </Button>
                      <div className={"classStudents"}>
                        {classs === curClass && classStudents.length
                          ? classStudents.map((student) => {
                              return (
                                <div key={student.id}>
                                  <li>
                                    {student.firstName} {student.lastName}
                                  </li>
                                  <hr />
                                </div>
                              );
                            })
                          : null}
                      </div>
                      <div>
                        <Link to={`/editClass/${curClass.id}`}>
                          <Button onClick={(e) => editClass(e, curClass)}>
                            Edit Class
                          </Button>
                        </Link>
                        <hr />
                        <Link to={`/enrollStudent/${curClass.id}`}>
                          <Button
                            disabled={classStudents.length >= 30 ? true : false}
                            onClick={(e) => enrollStudent(e, curClass)}
                          >
                            Enroll Student
                          </Button>
                        </Link>
                        <hr />
                        <Button onClick={(e) => deleteClass(e, curClass.id)}>
                          Remove Class
                        </Button>
                        <Link to={`/removeStudent/${curClass.id}`}>
                          <Button
                            disabled={classStudents.length === 0 ? true : false}
                            onClick={() => removeStudent(curClass)}
                          >
                            Remove Student
                          </Button>
                        </Link>
                        <hr />
                      </div>
                    </CardActions>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapState = ({ classes, students, classStudents, count, input }) => {
  const { classesCount } = count;
  const { page, classs } = input;
  return {
    classes,
    students,
    classStudents,
    classesCount,
    page,
    classs,
  };
};

const mapDispatch = (dispatch) => {
  const handlePageChange = (e, value) => {
    e.preventDefault();
    dispatch(setPage(value));
    dispatch(fetchClasses(value));
  };
  const enrollStudent = (e, curClass) => {
    dispatch(setClass(curClass.name));
    dispatch(fetchClassesStudents(curClass.id));
  };
  const editClass = (e, curClass) => {
    dispatch(setClass(curClass));
    dispatch(setClassName(curClass.name));
    dispatch(setClassImage(curClass.imageURL));
  };
  const deleteClass = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/api/classes_students/${id}`);
    await axios.delete(`/api/classes/${id}`);
    const { Classes } = (await axios.get("/api/all/classes")).data;
    dispatch(getAllClasses(Classes));
    dispatch(fetchClasses());
  };
  const showStudents = (e, curClass) => {
    e.preventDefault();
    dispatch(setClass(curClass));
    dispatch(fetchClassesStudents(curClass.id));
  };
  const removeStudent = (curClass) => {
    dispatch(setClass(curClass));
    dispatch(fetchClassesStudents(curClass.id));
  };
  return {
    dispatch,
    enrollStudent,
    editClass,
    deleteClass,
    handlePageChange,
    showStudents,
    removeStudent,
  };
};

export default connect(mapState, mapDispatch)(Classes);
