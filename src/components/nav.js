import React from "react";
import { Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  MenuList,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import FaceIcon from "@material-ui/icons/Face";
import SchoolIcon from "@material-ui/icons/School";
import HouseIcon from "@material-ui/icons/House";
import { updateInput, clearForm } from "../actions/actions";
import Axios from "axios";

const Nav = ({
  handleClose,
  toggle,
  toggleMenu,
  loggedIn,
  logout
}) => {
  return (
    <div>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <nav className="nav">
            <IconButton>
              <Link to="/">
                <HomeIcon fontSize="large" />
              </Link>
            </IconButton>
            <IconButton>
              <Link to="/students">
                <FaceIcon fontSize="large" />
              </Link>
            </IconButton>
            <IconButton>
              <Link to="/classes">
                <SchoolIcon fontSize="large" />
              </Link>
            </IconButton>
            <IconButton>
              <Link to="/houses">
                <HouseIcon fontSize="large" />
              </Link>
            </IconButton>

            <IconButton
              edge="start"
              aria-label="menu"
              color="inherit"
              onClick={(e) => toggleMenu(e, toggle)}
            >
              <MenuIcon />
            </IconButton>
            {toggle ? (
              <MenuList>
                <MenuItem onClick={handleClose}>
                  <Link to="/addStudent" className="menuItem">
                    Add Student
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/addClass" className="menuItem">
                    Add Class
                  </Link>
                </MenuItem>
                {loggedIn ? 
                  <div>
                    {" "}
                    <MenuItem>
                    <Button onClick={(e) => logout(e)} className="menuItem" variant ='outlined'>Logout</Button>{" "}
                    </MenuItem>
                  </div>
                 : 
                  <div>
                    <MenuItem>
                    <Link to="/login" className="menuItem">Log In</Link>
                    </MenuItem>
                    <MenuItem>
                    <Link to="/register" className="menuItem">Register</Link>
                    </MenuItem>
                  </div>
                }
              </MenuList>
            ) : null}
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapState = ({ count, input, houses, form }) => {
  const { toggle } = input;
  const { studentCount, classesCount } = count;
  const {loggedIn} = form
  return {
    studentCount,
    classesCount,
    houses,
    toggle,
    loggedIn
  };
};
const mapDispatch = (dispatch) => {
  const toggleMenu = (e, toggle) => {
    e.preventDefault();
    toggle = !toggle;
    dispatch(updateInput("toggle", toggle));
  };
  const logout = (e) => {
    e.preventDefault()
    Axios.delete('/api/logout')
    dispatch(clearForm())
    return <Redirect to='/login'/>
  }
  return {
    toggleMenu,
    logout
  };
};
export default connect(mapState, mapDispatch)(Nav);
