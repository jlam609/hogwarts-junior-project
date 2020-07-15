import React, { useEffect } from "react";
import {
  clearInput,
  postClasses,
  updateInput
} from "../actions/actions";
import { connect } from "react-redux";
import { TextField, FormControl, Button } from "@material-ui/core";

const AddClass = ({
  className,
  classImage,
  handleClassName,
  handleClassImage,
  submitClass,
  classesCount,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(clearInput());
  }, []);
  return (
    <div className="form">
      <FormControl>
        <TextField
          value={className}
          onChange={(e) => handleClassName(e)}
          label="Class Name"
        />{" "}
        <TextField
          value={classImage}
          onChange={(e) => handleClassImage(e)}
          label="Class Image"
        />{" "}
      </FormControl>
      <Button
        onClick={(e) => submitClass(e, className, classImage, classesCount)}
      >
        Add Class
      </Button>
    </div>
  );
};

const mapState = ({ input, count }) => {
  const { className, classImage } = input;
  const { classesCount } = count;
  return {
    className,
    classImage,
    classesCount,
  };
};

const mapDispatch = (dispatch) => {
  const handleClassName = (e) => {
    e.preventDefault;
    dispatch(updateInput('className', e.target.value));
  };
  const handleClassImage = (e) => {
    e.preventDefault;
    dispatch(updateInput('classImage', e.target.value));
  };
  const submitClass = (e, className, classImage, count) => {
    e.preventDefault();
    if (className !== "" && classImage !== "") {
      dispatch(
        postClasses(
          {
            name: className,
            imageURL: classImage,
          },
          count + 1
        )
      );
      dispatch(clearInput());
    } else if (className !== "") {
      dispatch(
        postClasses(
          {
            name: className,
          },
          count + 1
        )
      );
      dispatch(clearInput());
    } else alert("Must submit a valid name!");
  };
  return {
    handleClassName,
    handleClassImage,
    submitClass,
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(AddClass);
