import {
ADD_EMOTION_REQUEST,
ADD_EMOTION_ERROR,
ADD_EMOTION_SUCCESS,
ADD_VIDEO_ERROR,
ADD_VIDEO_SUCCESS,
ADD_VIDEO_REQUEST,
FETCH_EMOTIONS_ERROR,
FETCH_EMOTIONS_REQUEST,
FETCH_EMOTIONS_SUCCESS,
LOADING
} from "../constants/ActionTypes";

export const fetchEmotionsRequest = (payload) => {
  return {
    type: FETCH_EMOTIONS_REQUEST,
    payload: payload,
  };
};

export const fetchEmotionsSuccess= (payload) => {
  return {
    type: FETCH_EMOTIONS_SUCCESS,
    payload: payload,
  };
};

export const fetchEmotionsError = (payload) => {
  return {
    type: FETCH_EMOTIONS_ERROR,
    payload: payload,
  };
};

export const addEmotionRequest = (payload) => {
  return {
    type: ADD_EMOTION_REQUEST,
    payload: payload,
  };
};

export const addEmotionSuccess= (payload) => {
  return {
    type: ADD_EMOTION_SUCCESS,
    payload: payload,
  };
};

export const addEmotionError = (payload) => {
  return {
    type: ADD_EMOTION_ERROR,
    payload: payload,
  };
};

export const addVideoRequest = (payload) => {
  return {
    type: ADD_VIDEO_REQUEST,
    payload: payload,
  };
};

export const addVideoSuccess= (payload) => {
  return {
    type: ADD_VIDEO_SUCCESS,
    payload: payload,
  };
};

export const addVideoError = (payload) => {
  return {
    type: ADD_VIDEO_ERROR,
    payload: payload,
  };
};

export const loading = (payload) => {
  return {
    type: LOADING,
    payload: payload,
  };
};