import {
  ACCEPT_COMPANY_SUCCESS,
  ACCEPT_COMPANY_REQUEST,
  ACCEPT_COMPANY_ERROR,
  REJECT_COMPANY_SUCCESS,
  REJECT_COMPANY_REQUEST,
  REJECT_COMPANY_ERROR,
  BLOCK_VIDEO_ERROR,
  BLOCK_VIDEO_SUCCESS,
  BLOCK_VIDEO_REQUEST,
  UNBLOCK_VIDEO_SUCCESS,
  UNBLOCK_VIDEO_REQUEST,
  UNBLOCK_VIDEO_ERROR,
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACCEPT_COMPANY_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case REJECT_COMPANY_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case ACCEPT_COMPANY_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case REJECT_COMPANY_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case ACCEPT_COMPANY_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case REJECT_COMPANY_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case BLOCK_VIDEO_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case BLOCK_VIDEO_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case BLOCK_VIDEO_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case UNBLOCK_VIDEO_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case UNBLOCK_VIDEO_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case UNBLOCK_VIDEO_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }

    default: {
      return state;
    }
  }
};
