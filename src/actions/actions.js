const TYPES = require("./types");
const axios = require("axios");

const getStudents = (students) => ({
  type: TYPES.GET_STUDENTS,
  students,
});
const getStudentCount = (count) => ({
  type: TYPES.GET_STUDENT_COUNT,
  count,
});
const getClassesCount = (count) => ({
  type: TYPES.GET_CLASSES_COUNT,
  count,
});
const getClasses = (classes) => ({
  type: TYPES.GET_CLASSES,
  classes,
});
const getHouses = (houses) => ({
  type: TYPES.GET_HOUSES,
  houses,
});
const getClassesStudents = (classStudents) => ({
  type: TYPES.GET_CLASSES_STUDENTS,
  classStudents,
});
const addStudent = (student) => ({
  type: TYPES.ADD_STUDENT,
  student,
});
const addClass = (classs) => ({
  type: TYPES.ADD_CLASS,
  classs,
});

const postClassesStudents = (classStudentObj) => {
  return async (dispatch) => {
    const classStudent = (
      await axios.post("/api/classes_students", classStudentObj)
    ).data.item;
    return;
  };
};
const fetchStudents = (where = "", page = 1, size = 10) => {
  return async (dispatch) => {
    const { count, rows } = (
      await axios.get(`/api/students?filter=${where}&page=${page}&size=${size}`)
    ).data;
    dispatch(getStudentCount(count));
    return dispatch(getStudents(rows));
  };
};
const postStudents = (studentObj, count) => {
  return async (dispatch) => {
    const student = (await axios.post(`/api/students`, studentObj)).data.item;
    dispatch(getStudentCount(count));
    return dispatch(addStudent(student));
  };
};
const postClasses = (classObj, count) => {
  return async (dispatch) => {
    const classs = (await axios.post(`/api/classes`, classObj)).data.item;
    dispatch(getClassesCount(count));
    return dispatch(addClass(classs));
  };
};
const fetchClasses = (page = 1, size = 3) => {
  return async (dispatch) => {
    const { count, rows } = (
      await axios.get(`/api/classes?page=${page}&size=${size}`)
    ).data;
    dispatch(getClassesCount(count));
    return dispatch(getClasses(rows));
  };
};
const fetchClassesStudents = (id) => {
  return async (dispatch) => {
    const student_classes = (await axios.get(`/api/classes/${id}`)).data;
    return dispatch(getClassesStudents(student_classes));
  };
};
const fetchStudentsClasses = (id) => {
  return async (dispatch) => {
    const student_classes = (await axios.get(`/api/students/${id}`)).data;
    return dispatch(getClassesStudents(student_classes));
  };
};
const fetchHouses = () => {
  return async (dispatch) => {
    const { Houses } = (await axios.get("/api/all/houses")).data;
    return dispatch(getHouses(Houses));
  };
};

const clearInput = () => ({
  type: TYPES.CLEAR_INPUT,
});
const getAllStudents = (students) => ({
  type: TYPES.GET_ALL_STUDENTS,
  students,
});
const getAllClasses = (classes) => ({
  type: TYPES.GET_ALL_CLASSES,
  classes,
});
const updateInput = (name, value) => ({
    type:TYPES.UPDATE_INPUT,
    name,
    value
})
const updateForm = (name, value) => ({
	type:TYPES.UPDATE_FORM,
	name,
	value
})
const login = () => ({
	type:TYPES.LOG_IN
})
const clearForm = () => ( {
	type:TYPES.CLEAR_FORM
})


module.exports = {
  getStudents,
  getClasses,
  getHouses,
  addStudent,
  addClass,
  fetchStudents,
  fetchHouses,
  fetchClasses,
  postStudents,
  postClasses,
  getClassesStudents,
  fetchClassesStudents,
  clearInput,
  postClassesStudents,
  fetchStudentsClasses,
  getAllStudents,
  getAllClasses,
  updateInput,
  login,
  clearForm,
  updateForm
};
