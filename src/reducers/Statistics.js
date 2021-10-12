import {
  EMOTIONS_IN_VIDEO_ERROR,
  EMOTIONS_IN_VIDEO_REQUEST,
  EMOTIONS_IN_VIDEO_SUCCESS,
  STAT_AGE_ERROR,
  STAT_AGE_REQUEST,
  STAT_AGE_SUCCESS,
  STAT_ATTENTION_ERROR,
  STAT_ATTENTION_REQUEST,
  STAT_ATTENTION_SUCCESS,
  STAT_COUNTRY_ERROR,
  STAT_COUNTRY_REQUEST,
  STAT_COUNTRY_SUCCESS,
  STAT_GENDER_ERROR,
  STAT_GENDER_REQUEST,
  STAT_GENDER_SUCCESS,
  STAT_PAYING_ATTENTION_ERROR,
  STAT_PAYING_ATTENTION_REQUEST,
  STAT_PAYING_ATTENTION_SUCCESS,
  STAT_PREDOMINANT_EMOTION_ERROR,
  STAT_PREDOMINANT_EMOTION_REQUEST,
  STAT_PREDOMINANT_EMOTION_SUCCESS,
  STAT_TOP_RESULT_AGE_ERROR,
  STAT_TOP_RESULT_AGE_REQUEST,
  STAT_TOP_RESULT_AGE_SUCCESS,
  STAT_TOP_RESULT_COUNTRY_ERROR,
  STAT_TOP_RESULT_COUNTRY_REQUEST,
  STAT_TOP_RESULT_COUNTRY_SUCCESS,
  STAT_TOP_RESULT_GENDER_ERROR,
  STAT_TOP_RESULT_GENDER_REQUEST,
  STAT_TOP_RESULT_GENDER_SUCCESS,
  STAT_TOTAL_VIEW_ERROR,
  STAT_TOTAL_VIEW_REQUEST,
  STAT_TOTAL_VIEW_SUCCESS,
  TEST_ERROR,
  TEST_REQUEST,
  TEST_SUCCESS
} from "../constants/ActionTypes";

const INIT_STATE = {
  loaderStatistics: false,
  error: {},
  success: {},
  emotionsInVideo:[],
  ages:[],
  attention:{},
  country:[],
  gender:[],
  payingAttention:{},
  predominantEmotion:{},
  topAges:{},
  topCountry:{},
  topGender:{},
  totalViews:null,
  testInfo:[],
  image:null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EMOTIONS_IN_VIDEO_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case EMOTIONS_IN_VIDEO_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case EMOTIONS_IN_VIDEO_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        emotionsInVideo:action.payload
      };
    }
    case STAT_AGE_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_AGE_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_AGE_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        ages:action.payload,
      };
    }
    case STAT_ATTENTION_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_ATTENTION_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_ATTENTION_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        attention:action.payload,
      };
    }
    case STAT_COUNTRY_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_COUNTRY_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_COUNTRY_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        country:action.payload,
      };
    }
    case STAT_GENDER_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_GENDER_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_GENDER_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        gender:action.payload,
      };
    }
    case STAT_PAYING_ATTENTION_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_PAYING_ATTENTION_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_PAYING_ATTENTION_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        payingAttention:action.payload,
      };
    }
    case STAT_PREDOMINANT_EMOTION_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_PREDOMINANT_EMOTION_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_PREDOMINANT_EMOTION_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        predominantEmotion:action.payload,
      };
    }
    case STAT_TOP_RESULT_AGE_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_TOP_RESULT_AGE_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_TOP_RESULT_AGE_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        topAges:action.payload,
      };
    }
    case STAT_TOP_RESULT_COUNTRY_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_TOP_RESULT_COUNTRY_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_TOP_RESULT_COUNTRY_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        topCountry:action.payload,
      };
    }
    case STAT_TOP_RESULT_GENDER_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_TOP_RESULT_GENDER_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_TOP_RESULT_GENDER_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        topGender:action.payload,
      };
    }
    case STAT_TOTAL_VIEW_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case STAT_TOTAL_VIEW_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case STAT_TOTAL_VIEW_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        totalViews:action.payload,
      };
    }
    case TEST_REQUEST: {
      return {
        ...state,
        loaderStatistics: true,
      };
    }
    case TEST_ERROR: {
      return {
        ...state,
        loaderStatistics: false,
        error: action.payload,
      };
    }
    case TEST_SUCCESS: {
      return {
        ...state,
        loaderStatistics: false,
        testInfo:action.payload.results,
        image:action.payload.image
      };
    }
    
    

    default: {
      return state;
    }
  }
};
