import {
  FETCH_EMOTIONS_SUCCESS,
  FETCH_EMOTIONS_ERROR,
  FETCH_EMOTIONS_REQUEST,
  ADD_VIDEO_REQUEST,
  ADD_VIDEO_SUCCESS,
  ADD_VIDEO_ERROR,
  ADD_EMOTION_ERROR,
  ADD_EMOTION_REQUEST,
  ADD_EMOTION_SUCCESS,
  NOT_LOADING,
  REMOVE_SUCCESS,
  REMOVE_ERROR,
  LOADING,
} from "../constants/ActionTypes";

const INIT_STATE = {
  loaderCompany: false,
  emotions: [],
  videos: [],
  error: {},
  success: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_EMOTIONS_REQUEST: {
      return {
        ...state,
        loaderCompany: true,
      };
    }
    case FETCH_EMOTIONS_ERROR: {
      return {
        ...state,
        loaderCompany: false,
        error: action.payload,
      };
    }
    case FETCH_EMOTIONS_SUCCESS: {
      return {
        ...state,
        emotions: action.payload,
        loaderCompany: false,
      };
    }
    case ADD_EMOTION_REQUEST: {
      return {
        ...state,
        loaderCompany: true,
      };
    }
    case ADD_EMOTION_ERROR: {
      return {
        ...state,
        loaderCompany: false,
        error: action.payload,
      };
    }
    case ADD_EMOTION_SUCCESS: {
      return {
        ...state,
        loaderCompany: false,
        success: action.payload,
      };
    }
    case ADD_VIDEO_REQUEST: {
      return {
        ...state,
        loaderCompany: true,
      };
    }
    case ADD_VIDEO_ERROR: {
      return {
        ...state,
        loaderCompany: false,
        error: action.payload,
      };
    }
    case ADD_VIDEO_SUCCESS: {
      return {
        ...state,
        loaderCompany: false,
        success: action.payload,
      };
    }
    case NOT_LOADING: {
      return {
        ...state,
        loaderCompany: false,
      };
    }
    case LOADING: {
      return {
        ...state,
        loaderCompany: true,
      };
    }
    case REMOVE_ERROR: {
      return {
        ...state,
        error: {},
      };
    }
    case REMOVE_SUCCESS: {
      return {
        ...state,
        success: {},
      };
    }

    default: {
      return state;
    }
  }
};
