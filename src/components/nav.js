import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Tab,
  MenuItem,
  Button,
  MenuList,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import FaceIcon from "@material-ui/icons/Face";
import SchoolIcon from "@material-ui/icons/School";
import HouseIcon from "@material-ui/icons/House";
import { updateInput } from "../actions/actions";

const Nav = ({
  studentCount,
  classesCount,
  houses,
  handleClose,
  toggle,
  toggleMenu,
}) => {
  return (
    <div>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <nav className="nav">
            <IconButton > 
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
              </MenuList>
            ) : null}
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapState = ({ count, input, houses }) => {
  const { toggle } = input;
  const { studentCount, classesCount } = count;
  return {
    studentCount,
    classesCount,
    houses,
    toggle,
  };
};
const mapDispatch = (dispatch) => {
  const toggleMenu = (e, toggle) => {
    e.preventDefault();
    toggle = !toggle;
    dispatch(updateInput("toggle", toggle));
  };
  return {
    toggleMenu,
  };
};
export default connect(mapState, mapDispatch)(Nav);
