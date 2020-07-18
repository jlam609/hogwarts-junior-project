import React, { useEffect } from "react";
import { clearForm, login, updateForm } from "../actions/actions";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import { TextField, FormControl, Button } from "@material-ui/core";
import axios from 'axios'

const Login = ({
  username,
  password,
  loggedIn,
  setUsername,
  setPassword,
  logInUser,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(clearForm());
  }, []);
  return (
    <div>
      {loggedIn ? (
        <Redirect to ='/'/>
      ) : (
        <div className = 'form'>
          <FormControl>
            <TextField
              value={username}
              label="Username"
              onChange={setUsername}
            />
          </FormControl>
          <br />
          <FormControl>
            <TextField
              value={password}
              label="Password"
              onChange={setPassword}
            />
          </FormControl>
          <br />
          <Button
            variant="outlined"
            onClick={(e) => logInUser(e, username, password)}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

const mapState = ({ form }) => {
  const { username, password, loggedIn } = form;
  return {
    username,
    password,
    loggedIn,
  };
};

const mapDispatch = (dispatch) => {
  const setUsername = (e) => {
    dispatch(updateForm("username", e.target.value));
  };
  const setPassword = (e) => {
    dispatch(updateForm("password", e.target.value));
  };
  const logInUser = (e, username, password) => {
    e.preventDefault();
    if (username.length && password.length) {
      axios
        .post("/login", { username, password })
        .then((res) => {
          console.log(res.data.message);
          dispatch(login());
        })
        .catch((e) => console.error(e));
    } else alert("All Fields Must Be Completed");
  };
  return {
    setUsername,
    setPassword,
    logInUser,
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(Login);
