import TYPES from "./types";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";


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
    case TYPES.UPDATE_INPUT:
        return {
            ...state,
            [action.name]:action.value
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

const formReducer = (state = {
	username:'',
	password:'',
	loggedIn:false
}, action) => {
	switch (action.type){
	case TYPES.UPDATE_FORM:
	return {
	...state,
	[action.name]:action.value
};
	case TYPES.LOG_IN:
	return {
	...state,
	loggedIn:true
}
	case TYPES.CLEAR_FORM:
	return {
	username:'',
	password:'',
	loggedIn:false
}
  default:
  return state
}
}

const reducer = combineReducers({
  students: studentReducer,
  classes: classesReducer,
  houses: houseReducer,
  classStudents: classStudentsReducer,
  input: inputReducer,
  count: countReducer,
  form: formReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
