import {
CREATE_VIEW_ERROR,
CREATE_VIEW_REQUEST,
CREATE_VIEW_SUCCESS
} from "../constants/ActionTypes";

export const createViewRequest = (payload) => {
  return {
    type: CREATE_VIEW_REQUEST,
    payload: payload,
  };
};

export const createViewSuccess= (payload) => {
  return {
    type: CREATE_VIEW_SUCCESS,
    payload: payload,
  };
};

export const createViewError = (payload) => {
  return {
    type: CREATE_VIEW_ERROR,
    payload: payload,
  };
};
