
import {
    SIGN_UP_ADMIN_ERROR,
    SIGN_UP_ADMIN_REQUEST,
    SIGN_UP_ADMIN_SUCCESS,
    SIGN_UP_COMPANY_ERROR,
    SIGN_UP_COMPANY_REQUEST,
    SIGN_UP_COMPANY_SUCCESS,
    SIGN_UP_USER_ERROR,
    SIGN_UP_USER_REQUEST,
    SIGN_UP_USER_SUCCESS,
    NOT_LOADING
} from "../constants/ActionTypes";

const INIT_STATE = {
    loader:false
}

export default (state = INIT_STATE, action) => {
    console.log(state)
    switch (action.type) {
        case SIGN_UP_USER_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case SIGN_UP_USER_SUCCESS: {
            
            return {
                ...state,
                loader: false,
    
            }
        }
        case SIGN_UP_USER_ERROR: {
            return {
                ...state,
                alertMessage: action.payload,
                showMessage: true,
                loader: false
            }
        }
        case SIGN_UP_COMPANY_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case SIGN_UP_COMPANY_SUCCESS: {
            
            return {
                ...state,
                loader: false,
    
            }
        }
        case SIGN_UP_COMPANY_ERROR: {
            return {
                ...state,
                alertMessage: action.payload,
                showMessage: true,
                loader: false
            }
        }
        case SIGN_UP_ADMIN_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case SIGN_UP_ADMIN_SUCCESS: {
            
            return {
                ...state,
                loader: false,
    
            }
        }
        case SIGN_UP_ADMIN_ERROR: {
            return {
                ...state,
                alertMessage: action.payload,
                showMessage: true,
                loader: false
            }
        }
        case NOT_LOADING: {
            return {
                ...state,
                loader: false
            }
        }
   
   
        default: {
            return state
        }
    }
}
