import {
  COURSE_FAIL,
  ADD_COURSE,
  CLEAR_ERRORS,
  ADD_CLASS,
  CLASS_FAIL,
  DELETE_STUDENT,
  UPDATE_COURSE,
  UPDATE_CLASS,
  DELETE_COURSE,
  CLASS_DELETED,
  DELETE_CLASS,
} from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Create a course */
export const createCourse =
  ({ name }) =>
  async (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name });

    await axios
      .post("/api/course/create", body, config)
      .then((res) => {
        const { data } = res.data;
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: ADD_COURSE, payload: [data] });
        dispatch({ type: "COURSE_CREATED" });
      })
      .catch((err) => {
        dispatch({ type: COURSE_FAIL });
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "COURSE__ERROR"
          )
        );
      });
  };

export const getCourses = () => (dispatch) => {
  axios
    .get("/api/course")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: ADD_COURSE, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

/* Class Actions */
export const createClass =
  ({ name }) =>
  async (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name });

    await axios
      .post("/api/class/create", body, config)
      .then((res) => {
        const { data } = res.data;

        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: ADD_CLASS, payload: [data] });
        dispatch({ type: "CLASS_CREATED" });
      })
      .catch((err) => {
        dispatch({ type: CLASS_FAIL });
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "CLASS__ERROR"
          )
        );
      });
  };

export const getClasses = () => (dispatch) => {
  axios
    .get("/api/class")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: ADD_CLASS, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data.msg, err.response.status))
    );
};

export const deleteClass = (id) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .delete(`/api/class/`,{data: {class_id: `${id}`}}, config)
    .then(() => {
      dispatch({
        type: DELETE_CLASS,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateAClass =
  ({ class_name, slug, uid }) =>
  async (dispatch) => {
    // Request body
    const body = JSON.stringify({ class_name, slug, uid });

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .put("/api/class", body, config)
      .then(() => {
        dispatch({ type: UPDATE_CLASS });
        toast.success("Successfully updated a class");
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "UPDATE_ERROR",
            toast.error("Something went wrong record cannot delete...!")
          )
        );
      });
  };

export const updateACourse =
  ({ course_name, students, slug, uid }) =>
  async (dispatch) => {
    // Request body
    const body = JSON.stringify({ course_name, slug, uid, students });

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .put("/api/course", body, config)
      .then(() => {
        dispatch({ type: UPDATE_COURSE })
        toast.success("Successfully updated a class");
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "UPDATE_COURSE_ERROR",
            toast.error("Something went wrong record cannot delete...!")
          )
        );
      });
  };

export const deleteCourse = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .delete(`/api/course`, { data: { course_id: `${id}` } }, config)
    .then(() => {
      dispatch({
        type: DELETE_COURSE,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};