import {
  SIGN_UP_ADMIN_ERROR,
  SIGN_UP_ADMIN_REQUEST,
  SIGN_UP_ADMIN_SUCCESS,
  SIGN_UP_COMPANY_ERROR,
  SIGN_UP_COMPANY_REQUEST,
  SIGN_UP_COMPANY_SUCCESS,
  SIGN_UP_USER_ERROR,
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
} from "../constants/ActionTypes";

export const signUpUserRequest = (payload) => {
  return {
    type: SIGN_UP_USER_REQUEST,
    payload: payload,
  };
};

export const signUpUserSuccess = (payload) => {
  return {
    type: SIGN_UP_USER_SUCCESS,
    payload: payload,
  };
};

export const signUpUserError = (payload) => {
  return {
    type: SIGN_UP_USER_ERROR,
    payload: payload,
  };
};
export const signUpCompanyRequest = (payload) => {
  return {
    type: SIGN_UP_COMPANY_REQUEST,
    payload: payload,
  };
};

export const signUpCompanySuccess = (payload) => {
  return {
    type: SIGN_UP_COMPANY_SUCCESS,
    payload: payload,
  };
};

export const signUpCompanyError = (payload) => {
  return {
    type: SIGN_UP_COMPANY_ERROR,
    payload: payload,
  };
};

export const signUpAdminRequest = (payload) => {
  return {
    type: SIGN_UP_ADMIN_REQUEST,
    payload: payload,
  };
};

export const signUpAdminSuccess = (payload) => {
  return {
    type: SIGN_UP_ADMIN_SUCCESS,
    payload: payload,
  };
};

export const signUpAdminError = (payload) => {
  return {
    type: SIGN_UP_ADMIN_ERROR,
    payload: payload,
  };
};
