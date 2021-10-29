import {
ACCEPT_COMPANY_ERROR,
ACCEPT_COMPANY_REQUEST,
ACCEPT_COMPANY_SUCCESS,
REJECT_COMPANY_ERROR,
REJECT_COMPANY_REQUEST,
REJECT_COMPANY_SUCCESS,
BLOCK_VIDEO_ERROR,
BLOCK_VIDEO_REQUEST,
BLOCK_VIDEO_SUCCESS,
UNBLOCK_VIDEO_ERROR,
UNBLOCK_VIDEO_REQUEST,
UNBLOCK_VIDEO_SUCCESS
} from "../constants/ActionTypes";

export const acceptCompanyRequest = (payload) => {
  return {
    type: ACCEPT_COMPANY_REQUEST,
    payload:payload
  };
};

export const acceptCompanyError = (payload) => {
  return {
    type: ACCEPT_COMPANY_ERROR,
    payload:payload
  };
};

export const acceptCompanySuccess = (payload) => {
  return {
    type: ACCEPT_COMPANY_SUCCESS,
    payload:payload
  };
};

export const rejectCompanyRequest = (payload) => {
  return {
    type: REJECT_COMPANY_REQUEST,
    payload:payload
  };
};

export const rejectCompanyError = (payload) => {
  return {
    type: REJECT_COMPANY_ERROR,
    payload:payload
  };
};

export const rejectCompanySuccess = (payload) => {
  return {
    type: REJECT_COMPANY_SUCCESS,
    payload:payload
  };
};


export const blockVideoRequest = (payload) => {
  return {
    type: BLOCK_VIDEO_REQUEST,
    payload:payload
  };
};

export const blockVideoSuccess = (payload) => {
  return {
    type: BLOCK_VIDEO_SUCCESS,
    payload:payload
  };
};
export const blockVideoError = (payload) => {
  return {
    type: BLOCK_VIDEO_ERROR,
    payload:payload
  };
};


export const unblockVideoRequest = (payload) => {
  return {
    type: UNBLOCK_VIDEO_REQUEST,
    payload:payload
  };
};

export const unblockVideoSuccess = (payload) => {
  return {
    type: UNBLOCK_VIDEO_SUCCESS,
    payload:payload
  };
};
export const unblockVideoError = (payload) => {
  return {
    type: UNBLOCK_VIDEO_ERROR,
    payload:payload
  };
};

