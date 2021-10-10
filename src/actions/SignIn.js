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
  REMOVE_ERROR,
  REMOVE_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS
} from "../constants/ActionTypes";

export const signInUserRequest = (payload) => {
  return {
    type: SIGN_IN_USER_REQUEST,
    payload: payload,
  };
};

export const signOut = (payload) => {
  return {
    type: SIGN_OUT,
    payload: payload,
  };
};
export const signOutSuccess = (payload) => {
  return {
    type: SIGN_OUT_SUCCESS,
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

export const removeSuccess = (payload) => {
  return {
    type: REMOVE_SUCCESS,
    payload: payload,
  };
};

export const changePasswordRequest = (payload) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    payload: payload,
  };
};

export const changePasswordSuccess = (payload) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: payload,
  };
};

export const changePasswordError = (payload) => {
  return {
    type: CHANGE_PASSWORD_ERROR,
    payload: payload,
  };
};

export const updateProfileRequest = (payload) => {
  return {
    type: UPDATE_PROFILE_REQUEST,
    payload: payload,
  };
};

export const updateProfileSuccess = (payload) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: payload,
  };
};

export const updateProfileError = (payload) => {
  return {
    type: UPDATE_PROFILE_ERROR,
    payload: payload,
  };
};