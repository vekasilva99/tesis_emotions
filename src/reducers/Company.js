
import {
 FETCH_EMOTIONS_SUCCESS,
 FETCH_EMOTIONS_ERROR,
 FETCH_EMOTIONS_REQUEST,
 ADD_VIDEO_REQUEST,
 ADD_VIDEO_SUCCESS,
 ADD_VIDEO_ERROR,
 ADD_EMOTION_ERROR,
 ADD_EMOTION_REQUEST,
 ADD_EMOTION_SUCCESS
} from "../constants/ActionTypes";

const INIT_STATE = {
    loaderCompany:false,
    emotions:[],
    videos:[]
}

export default (state = INIT_STATE, action) => {
    console.log(state)
    switch (action.type) {
        case FETCH_EMOTIONS_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case FETCH_EMOTIONS_ERROR: {
            
            return {
                ...state,
                loader: false,
    
            }
        }
        case FETCH_EMOTIONS_SUCCESS: {
            return {
                ...state,
                emotions: action.payload,
                loader: false
            }
        }
        case ADD_EMOTION_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case ADD_EMOTION_ERROR: {
            
            return {
                ...state,
                loader: false,
    
            }
        }
        case ADD_EMOTION_SUCCESS: {
            return {
                ...state,
                loader: false
            }
        }
        case ADD_VIDEO_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case ADD_VIDEO_ERROR: {
            
            return {
                ...state,
                loader: false,
    
            }
        }
        case ADD_VIDEO_SUCCESS: {
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
