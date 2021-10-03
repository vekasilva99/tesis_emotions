import {
  CREATE_VIEW_REQUEST,
  CREATE_VIEW_SUCCESS,
  CREATE_VIEW_ERROR,
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_VIEW_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case CREATE_VIEW_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case CREATE_VIEW_SUCCESS: {
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
