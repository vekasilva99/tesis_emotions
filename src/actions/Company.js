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
DISABLE_VIDEO_ERROR,
DISABLE_VIDEO_REQUEST,
DISABLE_VIDEO_SUCCESS,
LOADING,
UPDATE_PROFILE_IMAGE_SUCCESS,
UPDATE_PROFILE_IMAGE_REQUEST,
UPDATE_PROFILE_IMAGE_ERROR,
UPDATE_EMOTION_ERROR,
UPDATE_EMOTION_REQUEST,
UPDATE_EMOTION_SUCCESS
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

export const disableVideoRequest = (payload) => {
  return {
    type: DISABLE_VIDEO_REQUEST,
    payload: payload,
  };
};

export const disableVideoSuccess= (payload) => {
  return {
    type: DISABLE_VIDEO_SUCCESS,
    payload: payload,
  };
};

export const disableVideoError = (payload) => {
  return {
    type: DISABLE_VIDEO_ERROR,
    payload: payload,
  };
};

export const updateImageRequest = (payload) => {
  return {
    type: UPDATE_PROFILE_IMAGE_REQUEST,
    payload: payload,
  };
};

export const updateImageSuccess= (payload) => {
  return {
    type:UPDATE_PROFILE_IMAGE_SUCCESS,
    payload: payload,
  };
};

export const updateImageError = (payload) => {
  return {
    type: UPDATE_PROFILE_IMAGE_ERROR,
    payload: payload,
  };
};

export const updateEmotionRequest = (payload) => {
  return {
    type: UPDATE_EMOTION_REQUEST,
    payload: payload,
  };
};

export const updateEmotionSuccess= (payload) => {
  return {
    type:UPDATE_EMOTION_SUCCESS,
    payload: payload,
  };
};

export const updateEmotionError = (payload) => {
  return {
    type: UPDATE_EMOTION_ERROR,
    payload: payload,
  };
};
