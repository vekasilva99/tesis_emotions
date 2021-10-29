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
  DISABLE_VIDEO_SUCCESS,
  DISABLE_VIDEO_ERROR,
  DISABLE_VIDEO_REQUEST,
  UPDATE_PROFILE_IMAGE_ERROR,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_EMOTION_SUCCESS,
  UPDATE_EMOTION_REQUEST,
  UPDATE_EMOTION_ERROR
} from "../constants/ActionTypes";

const INIT_STATE = {
  loaderCompany: false,
  emotions: [],
  videos: [],
  error: {},
  success: {},
};

export default (state = INIT_STATE, action) => {
  console.log("ACTIOOONN",action)
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
    case DISABLE_VIDEO_REQUEST: {
      return {
        ...state,
        loaderCompany: true,
      };
    }
    case DISABLE_VIDEO_ERROR: {
      return {
        ...state,
        loaderCompany: false,
        error: action.payload,
      };
    }
    case DISABLE_VIDEO_SUCCESS: {
      return {
        ...state,
        loaderCompany: false,
      };
    }
    case UPDATE_PROFILE_IMAGE_REQUEST: {
      return {
        ...state,
        loaderCompany: true,
      };
    }
    case UPDATE_PROFILE_IMAGE_ERROR: {
      return {
        ...state,
        loaderCompany: false,
        error: action.payload,
      };
    }
    case UPDATE_PROFILE_IMAGE_SUCCESS: {
      return {
        ...state,
        loaderCompany: false,
      };
    }
    case UPDATE_EMOTION_REQUEST: {
      return {
        ...state,
        loaderCompany: true,
      };
    }
    case UPDATE_EMOTION_ERROR: {
      return {
        ...state,
        loaderCompany: false,
        error: action.payload,
      };
    }
    case UPDATE_EMOTION_SUCCESS: {
      return {
        ...state,
        loaderCompany: false,
      };
    }
    default: {
      return state;
    }
  }
};
