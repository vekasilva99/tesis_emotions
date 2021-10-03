import {
FETCH_COMPANIES_SUCCESS,
FETCH_COMPANIES_REQUEST,
FETCH_COMPANIES_ERROR,
FETCH_VIDEOS_ERROR,
FETCH_VIDEOS_REQUEST,
FETCH_VIDEOS_SUCCESS,
FETCH_VIDEO_ERROR,
FETCH_VIDEO_REQUEST,
FETCH_VIDEO_SUCCESS,
FETCH_ALL_VIDEOS_ERROR,
FETCH_ALL_VIDEOS_REQUEST,
FETCH_ALL_VIDEOS_SUCCESS
} from "../constants/ActionTypes";

export const fetchCompaniesRequest = (payload) => {
  return {
    type: FETCH_COMPANIES_REQUEST,
    payload: payload,
  };
};

export const fetchCompaniesSuccess= (payload) => {
  return {
    type: FETCH_COMPANIES_SUCCESS,
    payload: payload,
  };
};

export const fetchCompaniesError = (payload) => {
  return {
    type: FETCH_COMPANIES_ERROR,
    payload: payload,
  };
};

export const fetchVideosRequest = (payload) => {
  return {
    type: FETCH_VIDEOS_REQUEST,
    payload: payload,
  };
};

export const fetchVideosSuccess= (payload) => {
  return {
    type: FETCH_VIDEOS_SUCCESS,
    payload: payload,
  };
};

export const fetchVideosError = (payload) => {
  return {
    type: FETCH_VIDEOS_ERROR,
    payload: payload,
  };
};

export const fetchVideoRequest = (payload) => {
  console.log("JJJ")
  return {
    type: FETCH_VIDEO_REQUEST,
    payload: payload,
  };
};

export const fetchVideoSuccess= (payload) => {
  return {
    type: FETCH_VIDEO_SUCCESS,
    payload: payload,
  };
};

export const fetchVideoError = (payload) => {
  return {
    type: FETCH_VIDEO_ERROR,
    payload: payload,
  };
};


export const fetchAllVideosRequest = (payload) => {
  return {
    type: FETCH_ALL_VIDEOS_REQUEST,
    payload: payload,
  };
};

export const fetchAllVideosSuccess= (payload) => {
  return {
    type: FETCH_ALL_VIDEOS_SUCCESS,
    payload: payload,
  };
};

export const fetchAllVideosError = (payload) => {
  return {
    type: FETCH_ALL_VIDEOS_ERROR,
    payload: payload,
  };
};