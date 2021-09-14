
import {
  FETCH_COMPANIES_ERROR,
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS
} from "../constants/ActionTypes";

const INIT_STATE = {
    loader:false,
    companies:[]
}

export default (state = INIT_STATE, action) => {
    console.log(state)
    switch (action.type) {
        case FETCH_COMPANIES_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case FETCH_COMPANIES_ERROR: {
            
            return {
                ...state,
                loader: false,
    
            }
        }
        case FETCH_COMPANIES_SUCCESS: {
            return {
                ...state,
                companies: action.payload,
                loader: false
            }
        }
        
        
   
        default: {
            return state
        }
    }
}
