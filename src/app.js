import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchStudents,
  fetchClasses,
  fetchHouses,
  getAllStudents,
  getAllClasses,
} from "./actions/actions";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/nav";
import Students from "./containers/students";
import Classes from "./containers/classes";
import Houses from "./containers/houses";
import Home from "./containers/home";
import AddStudent from "./components/addStudents";
import AddClass from "./components/addClass";
import EnrollStudent from "./components/enrollStudent";
import EditClass from "./components/editClass";
import EditStudent from "./components/editStudent";
import RemoveStudent from "./components/removeStudent";
import Axios from "axios";

const App = ({ state, dispatch }) => {
  useEffect(() => {
    const getData = async () => {
      dispatch(fetchClasses());
      dispatch(fetchStudents());
      dispatch(fetchHouses());
      let { Classes } = (await Axios.get("/api/all/classes")).data;
      let { Students } = (await Axios.get("/api/all/students")).data;
      Classes = Classes.sort((a, b) => {
        if (a.name < b.name) return -1;
        else return 1;
      });
      Students = Students.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        else return 1;
      });
      await dispatch(getAllClasses(Classes));
      await dispatch(getAllStudents(Students));
    };
    getData();
  }, []);
  return (
    <div>
      <h1 className="header"></h1>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/students">
          <Students />
        </Route>
        <Route path="/classes">
          <Classes />
        </Route>
        <Route path="/houses">
          <Houses />
        </Route>
        <Route path="/addStudent">
          <AddStudent />
        </Route>
        <Route path="/addClass">
          <AddClass />
        </Route>
        <Route path="/enrollStudent/:id">
          <EnrollStudent />
        </Route>
        <Route path="/editClass/:id">
          <EditClass />
        </Route>
        <Route path="/editStudent/:id">
          <EditStudent />
        </Route>
        <Route path="/removeStudent/:id">
          <RemoveStudent />
        </Route>
      </Switch>
    </div>
  );
};

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(App);
