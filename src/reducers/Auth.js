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
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  SIGN_UP_ADMIN_SUCCESS,
  SIGN_UP_COMPANY_SUCCESS,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_ERROR,
  SIGN_UP_ADMIN_ERROR,
  SIGN_UP_COMPANY_ERROR,
  REMOVE_ERROR,
  SIGN_OUT,
  REMOVE_SUCCESS,
  SIGN_OUT_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_ERROR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_ERROR,
} from "../constants/ActionTypes";

const INIT_STATE = {
  role: null,
  full_name: null,
  email: null,
  gender: null,
  active: null,
  accepted: null,
  birthdate: null,
  country: null,
  mainImg: null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  _id: localStorage.getItem("_id") ? localStorage.getItem("_id") : null,
  error: {},
  success: {},
  loader: false,
};

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case SIGN_IN_USER_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case SIGN_IN_USER_SUCCESS: {
      localStorage.setItem("_id", action.payload.data.data._id);
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        loader: false,
        token: action.payload.data.token,
        _id: action.payload.data.data._id,
        role:
          action.payload.data.data.isAdmin != undefined
            ? action.payload.data.data.isAdmin
              ? "admin"
              : "user"
            : "company",
        full_name: action.payload.data.data.full_name,
        email: action.payload.data.data.email,
        gender: action.payload.data.data.gender
          ? action.payload.data.data.gender
          : null,
        active: action.payload.data.data.active,
        accepted: action.payload.data.data.accepted
          ? action.payload.data.data.accepted
          : null,
        birthdate: action.payload.data.data.birthdate
          ? action.payload.data.data.birthdate
          : null,
        country: action.payload.data.data.country
          ? action.payload.data.data.country
          : null,
        mainImg: action.payload.data.data.mainImg
          ? action.payload.data.data.mainImg
          : null,
      };
    }
    case SIGN_OUT_SUCCESS: {
      return {
        ...state,
        loader: false,
        token: null,
        _id: null,
        role: null,
        full_name: null,
        email: null,
        gender: null,
        active: null,
        accepted: null,
        birthdate: null,
        country: null,
        mainImg: null,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        loader: true,
      };
    }
    case SIGN_UP_USER_SUCCESS: {
      localStorage.setItem("token", action.payload.data.token);

      return {
        ...state,
        loader: false,

        success: { success: "User has been succesfully registered." },
      };
    }
    case SIGN_UP_COMPANY_SUCCESS: {
      return {
        ...state,
        loader: false,
    
        success: {
          success:
            "The company has been successfully registered. Please, wait for the confirmation email that we'll send you when your account has been activated.",
        },
      };
    }
    case SIGN_IN_USER_ERROR: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        error: action.payload,
      };
    }
    case SIGN_UP_USER_ERROR: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        error: action.payload,
      };
    }
    case SIGN_UP_COMPANY_ERROR: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        error: action.payload,
      };
    }
    case SIGN_UP_ADMIN_ERROR: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        error: action.payload,
      };
    }
    case FETCH_USER_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        _id: action.payload.data.data._id,
        role: action.payload.data.data.role,
        full_name: action.payload.data.data.full_name,
        email: action.payload.data.data.email,
        gender: action.payload.data.data.gender
          ? action.payload.data.data.gender
          : null,
        active: action.payload.data.data.active,
        accepted: action.payload.data.data.accepted
          ? action.payload.data.data.accepted
          : null,
        birthdate: action.payload.data.data.birthdate
          ? action.payload.data.data.birthdate
          : null,
        country: action.payload.data.data.country
          ? action.payload.data.data.country
          : null,
        mainImg: action.payload.data.data.mainImg
          ? action.payload.data.data.mainImg
          : null,
      };
    }
    case FETCH_USER_ERROR: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        error: action.payload,
      };
    }
    case SIGN_IN_COMPANY_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case SIGN_IN_COMPANY_SUCCESS: {
      localStorage.setItem("token", action.payload.data.token);

      return {
        ...state,
        loader: false,
        ...state,
        loader: false,
        token: action.payload.data.token,
        _id: action.payload.data.data._id,
        role:
          action.payload.data.data.isAdmin != undefined
            ? action.payload.data.data.isAdmin
              ? "admin"
              : "user"
            : "company",
        full_name: action.payload.data.data.full_name,
        email: action.payload.data.data.email,
        gender: action.payload.data.data.gender
          ? action.payload.data.data.gender
          : null,
        active: action.payload.data.data.active,
        accepted: action.payload.data.data.accepted
          ? action.payload.data.data.accepted
          : null,
        birthdate: action.payload.data.data.birthdate
          ? action.payload.data.data.birthdate
          : null,
        country: action.payload.data.data.country
          ? action.payload.data.data.country
          : null,
        mainImg: action.payload.data.data.mainImg
          ? action.payload.data.data.mainImg
          : null,
      };
    }
    case SIGN_IN_COMPANY_ERROR: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        error: action.payload,
      };
    }
    case SIGN_IN_ADMIN_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case SIGN_IN_ADMIN_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case SIGN_IN_ADMIN_ERROR: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
      };
    }
    case REMOVE_ERROR: {
      return {
        ...state,
        loader: false,
        error: {},
        success: {},
      };
    }
    case REMOVE_SUCCESS: {
      return {
        ...state,
        loader: false,
        success: {},
      };
    }
    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case CHANGE_PASSWORD_ERROR: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        error: action.payload
      };
    }
    case UPDATE_PROFILE_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case UPDATE_PROFILE_ERROR: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
