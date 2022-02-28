import { ADD_COURSE, COURSE_FAIL, UPDATE_COURSE, COURSE_CREATED,DELETE_COURSE  } from "../actions/types";

const initialState = {
  loading: true,
  courses: [],
  created: false,
  updated: false,
  deleted: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, ...payload],
      };
    case COURSE_CREATED:
      return {
        ...state,
        created: true,
      };
    case COURSE_FAIL:
      return {
        ...state,
        created: false,
      };
    case UPDATE_COURSE:
      return {
        ...state,
        updated: true,
      };
    case DELETE_COURSE:
      return {
        ...state,
        deleted: true,
      };
    default:
      return state;
  }
};