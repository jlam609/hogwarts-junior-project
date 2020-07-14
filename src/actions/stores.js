import TYPES from "./types";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import actions from "./actions";

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.GET_STUDENTS:
      return [...action.students];
    case TYPES.ADD_STUDENT:
      return [...state, action.student];
    default:
      return state;
  }
};
const classesReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.GET_CLASSES:
      return [...action.classes];
    case TYPES.ADD_CLASS:
      return [...state, action.classs];
    default:
      return state;
  }
};
const houseReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.GET_HOUSES:
      return [...action.houses];
    default:
      return state;
  }
};
const classStudentsReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.GET_CLASSES_STUDENTS:
      return [...action.classStudents];
    case TYPES.ADD_CLASSES_STUDENTS:
      return [...state, action.classStudent];
    default:
      return state;
  }
};
const countReducer = (
  state = {
    studentCount: 0,
    classesCount: 0,
    allStudents:[],
    allClasses:[]
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_STUDENT_COUNT:
      return {
        ...state,
        studentCount: action.count,
      };
    case TYPES.GET_CLASSES_COUNT:
      return {
        ...state,
        classesCount: action.count,
      };
    case TYPES.GET_ALL_STUDENTS:
      return {
        ...state,
        allStudents: [...action.students],
      };
    case TYPES.GET_ALL_CLASSES:
      return {
        ...state,
        allClasses: [...action.classes],
      };
    default:
      return state;
  }
};
const inputReducer = (
  state = {
    firstName: "",
    lastName: "",
    email: "",
    grade: "",
    student: "",
    className: "",
    classImage: "",
    classs: "",
    page: 1,
    toggle: false,
    filter: "",
    house:''
  },
  action
) => {
  switch (action.type) {
    case TYPES.SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.firstName,
      };
    case TYPES.SET_LAST_NAME:
      return {
        ...state,
        lastName: action.lastName,
      };
    case TYPES.SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case TYPES.SET_GRADE:
      return {
        ...state,
        grade: action.grade,
      };
    case TYPES.SET_STUDENT:
      return {
        ...state,
        student: action.student,
      };
    case TYPES.SET_CLASS_NAME:
      return {
        ...state,
        className: action.className,
      };
    case TYPES.SET_CLASS_IMAGE:
      return {
        ...state,
        classImage: action.classImage,
      };
    case TYPES.SET_CLASS:
      return { ...state, classs: action.classs };
    case TYPES.SET_PAGE:
      return { ...state, page: action.page };
    case TYPES.SET_TOGGLE:
      return {
        ...state,
        toggle: action.toggle,
      };
    case TYPES.GET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case TYPES.SET_HOUSE:
        return{
            ...state,
            house:action.house
        }

    case TYPES.CLEAR_INPUT:
      return {
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        grade: "",
        student: "",
        className: "",
        classImage: "",
        classs: "",
        toggle: false,
        page: 1,
        filter: "",
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  students: studentReducer,
  classes: classesReducer,
  houses: houseReducer,
  classStudents: classStudentsReducer,
  input: inputReducer,
  count: countReducer,
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
