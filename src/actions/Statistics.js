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

export const emotionsInVideoRequest = (payload) => {
  return {
    type: EMOTIONS_IN_VIDEO_REQUEST,
    payload: payload,
  };
};

export const emotionsInVideoSuccess= (payload) => {
  return {
    type: EMOTIONS_IN_VIDEO_SUCCESS,
    payload: payload,
  };
};

export const emotionsInVideoError = (payload) => {
  return {
    type: EMOTIONS_IN_VIDEO_ERROR,
    payload: payload,
  };
};

export const statAgeRequest = (payload) => {
  return {
    type: STAT_AGE_REQUEST,
    payload: payload,
  };
};

export const statAgeSuccess= (payload) => {
  return {
    type: STAT_AGE_SUCCESS,
    payload: payload,
  };
};

export const statAgeError = (payload) => {
  return {
    type: STAT_AGE_ERROR,
    payload: payload,
  };
};

export const statAttentionRequest = (payload) => {
  return {
    type: STAT_ATTENTION_REQUEST,
    payload: payload,
  };
};

export const statAttentionSuccess= (payload) => {
  return {
    type: STAT_ATTENTION_SUCCESS,
    payload: payload,
  };
};

export const statAttentionError = (payload) => {
  return {
    type: STAT_ATTENTION_ERROR,
    payload: payload,
  };
};

export const statCountryRequest = (payload) => {
  return {
    type: STAT_COUNTRY_REQUEST,
    payload: payload,
  };
};

export const statCountrySuccess= (payload) => {
  return {
    type: STAT_COUNTRY_SUCCESS,
    payload: payload,
  };
};

export const statCountryError = (payload) => {
  return {
    type: STAT_COUNTRY_ERROR,
    payload: payload,
  };
};

export const statGenderRequest = (payload) => {
  return {
    type: STAT_GENDER_REQUEST,
    payload: payload,
  };
};

export const statGenderSuccess= (payload) => {
  return {
    type: STAT_GENDER_SUCCESS,
    payload: payload,
  };
};

export const statGenderError = (payload) => {
  return {
    type: STAT_GENDER_ERROR,
    payload: payload,
  };
};

export const statPredominantEmotionRequest = (payload) => {
  return {
    type: STAT_PREDOMINANT_EMOTION_REQUEST,
    payload: payload,
  };
};

export const statPredominantEmotionSuccess= (payload) => {
  return {
    type: STAT_PREDOMINANT_EMOTION_SUCCESS,
    payload: payload,
  };
};

export const statPredominantEmotionError = (payload) => {
  return {
    type: STAT_PREDOMINANT_EMOTION_ERROR,
    payload: payload,
  };
};
export const statPayingAttentionRequest = (payload) => {
  return {
    type: STAT_PAYING_ATTENTION_REQUEST,
    payload: payload,
  };
};

export const statPayingAttentionSuccess= (payload) => {
  return {
    type: STAT_PAYING_ATTENTION_SUCCESS,
    payload: payload,
  };
};

export const statPayingAttentionError = (payload) => {
  return {
    type: STAT_PAYING_ATTENTION_ERROR,
    payload: payload,
  };
};

export const statTopAgeRequest = (payload) => {
  return {
    type: STAT_TOP_RESULT_AGE_REQUEST,
    payload: payload,
  };
};

export const statTopAgeSuccess= (payload) => {
  return {
    type: STAT_TOP_RESULT_AGE_SUCCESS,
    payload: payload,
  };
};

export const statTopAgeError = (payload) => {
  return {
    type: STAT_TOP_RESULT_AGE_ERROR,
    payload: payload,
  };
};

export const statTopCountryRequest = (payload) => {
  return {
    type: STAT_TOP_RESULT_COUNTRY_REQUEST,
    payload: payload,
  };
};

export const statTopCountrySuccess= (payload) => {
  return {
    type: STAT_TOP_RESULT_COUNTRY_SUCCESS,
    payload: payload,
  };
};

export const statTopCountryError = (payload) => {
  return {
    type: STAT_TOP_RESULT_COUNTRY_ERROR,
    payload: payload,
  };
};

export const statTopGenderRequest = (payload) => {
  return {
    type: STAT_TOP_RESULT_GENDER_REQUEST,
    payload: payload,
  };
};

export const statTopGenderSuccess= (payload) => {
  return {
    type: STAT_TOP_RESULT_GENDER_SUCCESS,
    payload: payload,
  };
};

export const statTopGenderError = (payload) => {
  return {
    type: STAT_TOP_RESULT_GENDER_ERROR,
    payload: payload,
  };
};

export const statTotalViewsRequest = (payload) => {
  return {
    type: STAT_TOTAL_VIEW_REQUEST,
    payload: payload,
  };
};

export const statTotalViewsSuccess= (payload) => {
  return {
    type: STAT_TOTAL_VIEW_SUCCESS,
    payload: payload,
  };
};

export const statTotalViewsError = (payload) => {
  return {
    type: STAT_TOTAL_VIEW_ERROR,
    payload: payload,
  };
};

export const testRequest = (payload) => {
  return {
    type: TEST_REQUEST,
    payload: payload,
  };
};

export const testSuccess= (payload) => {
  return {
    type: TEST_SUCCESS,
    payload: payload,
  };
};

export const testError = (payload) => {
  return {
    type: TEST_ERROR,
    payload: payload,
  };
};

