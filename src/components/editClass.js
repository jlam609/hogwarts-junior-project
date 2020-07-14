import React from "react";
import {
  clearInput,
  fetchClasses,
  setClassName,
  setClassImage,
} from "../actions/actions";
import { connect } from "react-redux";
import axios from "axios";
import { TextField, FormControl, Button } from "@material-ui/core";

const EditClass = ({
  classs,
  className,
  classImage,
  handleClassImage,
  handleClassName,
  editClass,
}) => {
  return (
    <div className="form">
      <FormControl>
        <TextField
          value={className}
          onChange={(e) => handleClassName(e)}
          label="Class Name"
        />
        <TextField
          value={classImage}
          onChange={(e) => handleClassImage(e)}
          label="Class Image"
        />
        <Button onClick={(e) => editClass(e, className, classImage, classs)}>
          Edit Class
        </Button>
      </FormControl>
    </div>
  );
};

const mapState = ({ input }) => {
  const { classs, className, classImage } = input;
  return {
    classs,
    className,
    classImage,
  };
};
const mapDispatch = (dispatch) => {
  const handleClassName = (e) => {
    dispatch(setClassName(e.target.value));
  };
  const handleClassImage = (e) => {
    dispatch(setClassImage(e.target.value));
  };
  const editClass = async (e, className, classImage, classs) => {
    e.preventDefault();
    if (
      className !== "" &&
      classImage !== "" &&
      typeof className === "string" &&
      typeof classImage === "string"
    ) {
      await axios.put(`/api/classes/${classs.id}`, {
        name: className,
        imageURL: classImage,
      });
      dispatch(fetchClasses());
      dispatch(clearInput());
    }
  };
  return {
    handleClassImage,
    handleClassName,
    editClass,
  };
};

export default connect(mapState, mapDispatch)(EditClass);
