import {
FETCH_COMPANIES_SUCCESS,
FETCH_COMPANIES_REQUEST,
FETCH_COMPANIES_ERROR
} from "../constants/ActionTypes";

export const fetchCompaniesRequest = (payload) => {
  return {
    type: FETCH_COMPANIES_REQUEST,
    payload: payload,
  };
};

export const fetchCompaniesSuccess= (payload) => {
  return {
    type: FETCH_COMPANIES_SUCCESS,
    payload: payload,
  };
};

export const fetchCompaniesError = (payload) => {
  return {
    type: FETCH_COMPANIES_ERROR,
    payload: payload,
  };
};