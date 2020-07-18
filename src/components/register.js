import React, { useEffect } from "react";
import { clearForm, logIn, updateForm } from "../actions/actions";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import { TextField, FormControl, Button } from "@material-ui/core";
const axios = require('axios')

const Register = ({
  username,
  password,
  loggedIn,
  setUsername,
  setPassword,
  createUser,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(clearForm());
  }, []);
  return (
    <div>
      {loggedIn ? (
        <div>
          <Redirect to ='/'/>
        </div>
      ) : (
        <div className = 'form'>
          <FormControl>
            <TextField
              value={username}
              label="UserName"
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
            onClick={(e) => createUser(e, username, password)}
          >
            Create New User
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
  const createUser = (e, username, password) => {
    if (username.length && password.length) {
      axios
        .post("/api/register", { username, password })
        .then((res) => {
          console.log(res.data.message);
          dispatch(clearForm());
        })
        .catch((e) => console.error(e));
    }
  };
  return {
    setUsername,
    setPassword,
    createUser,
    dispatch
  };
};
export default connect(mapState, mapDispatch)(Register);
