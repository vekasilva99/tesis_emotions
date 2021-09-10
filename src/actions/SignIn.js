import {
  SIGN_IN_ADMIN_ERROR,
  SIGN_IN_ADMIN_REQUEST,
  SIGN_IN_ADMIN_SUCCESS,
  SIGN_IN_COMPANY_ERROR,
  SIGN_IN_COMPANY_REQUEST,
  SIGN_IN_COMPANY_SUCCESS,
  SIGN_IN_USER_ERROR,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  REMOVE_ERROR
} from "../constants/ActionTypes";

export const signInUserRequest = (payload) => {
  return {
    type: SIGN_IN_USER_REQUEST,
    payload: payload,
  };
};

export const signInUserSuccess = (payload) => {
  return {
    type: SIGN_IN_USER_SUCCESS,
    payload: payload,
  };
};

export const signInUserError = (payload) => {
  return {
    type: SIGN_IN_USER_ERROR,
    payload: payload,
  };
};
export const signInCompanyRequest = (payload) => {
  return {
    type: SIGN_IN_COMPANY_REQUEST,
    payload: payload,
  };
};

export const signInCompanySuccess = (payload) => {
  return {
    type: SIGN_IN_COMPANY_SUCCESS,
    payload: payload,
  };
};

export const signInCompanyError = (payload) => {
  return {
    type: SIGN_IN_COMPANY_ERROR,
    payload: payload,
  };
};

export const signInAdminRequest = (payload) => {
  return {
    type: SIGN_IN_ADMIN_REQUEST,
    payload: payload,
  };
};

export const signInAdminSuccess = (payload) => {
  return {
    type: SIGN_IN_ADMIN_SUCCESS,
    payload: payload,
  };
};

export const signInAdminError = (payload) => {
  return {
    type: SIGN_IN_ADMIN_ERROR,
    payload: payload,
  };
};

export const fetchUserRequest = (payload) => {
  return {
    type: FETCH_USER_REQUEST,
    payload: payload,
  };
};

export const fetchUserSuccess = (payload) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: payload,
  };
};

export const fetchUserError = (payload) => {
  return {
    type: FETCH_USER_ERROR,
    payload: payload,
  };
};

export const removeError = (payload) => {
  return {
    type: REMOVE_ERROR,
    payload: payload,
  };
};
