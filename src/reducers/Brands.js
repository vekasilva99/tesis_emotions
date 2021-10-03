import {
  FETCH_COMPANIES_ERROR,
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_ERROR,
  FETCH_ALL_VIDEOS_SUCCESS,
  FETCH_ALL_VIDEOS_REQUEST,
  FETCH_ALL_VIDEOS_ERROR,
  FETCH_VIDEO_ERROR,
  FETCH_VIDEO_REQUEST,
  FETCH_VIDEO_SUCCESS,
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  companies: [],
  videos: [],
  notAccepted: [],
  selectedCompany: {},
  selectedVideo: {},
  allVideos: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case FETCH_COMPANIES_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case FETCH_COMPANIES_SUCCESS: {
      return {
        ...state,
        companies: action.payload,
        notAccepted: action.payload.filter((company) => {
          return company.accepted === false && company.active;
        }),
        loader: false,
      };
    }
    case FETCH_VIDEOS_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case FETCH_VIDEOS_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case FETCH_VIDEOS_SUCCESS: {
      return {
        ...state,
        videos: action.payload.videos,
        loader: false,
        selectedCompany: action.payload.company,
      };
    }

    case FETCH_ALL_VIDEOS_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case FETCH_ALL_VIDEOS_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case FETCH_ALL_VIDEOS_SUCCESS: {
      return {
        ...state,
        allVideos: action.payload,
        loader: false,
      };
    }

    case FETCH_VIDEO_REQUEST: {
      return {
        ...state,
        loader: true,
      };
    }
    case FETCH_VIDEO_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case FETCH_VIDEO_SUCCESS: {
      return {
        ...state,
        loader: false,
        selectedVideo: action.payload.video,
        selectedCompany: action.payload.company,
      };
    }

    default: {
      return state;
    }
  }
};
